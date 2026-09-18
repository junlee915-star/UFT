// 최소 BibTeX 파서와 참고문헌 서식 유틸. 외부 의존성 없음.
import fs from 'node:fs';

/** @typedef {{ type: string, key: string, fields: Record<string, string> }} BibEntry */

/**
 * BibTeX 문자열을 항목 배열로 파싱한다. 중괄호/따옴표 값, 연결(#)은 문자열로 처리.
 * @param {string} src
 * @returns {BibEntry[]}
 */
export function parseBibtex(src) {
  const entries = [];
  const strings = {};
  let i = 0;
  const n = src.length;

  const skipWs = () => {
    while (i < n && /\s/.test(src[i])) i++;
  };
  const readUntil = (re) => {
    let s = '';
    while (i < n && !re.test(src[i])) s += src[i++];
    return s;
  };
  const readBraced = () => {
    // src[i] === '{'
    let depth = 0;
    let s = '';
    do {
      const c = src[i++];
      if (c === '{') depth++;
      else if (c === '}') depth--;
      if (depth > 0 && !(c === '{' && depth === 1)) s += c;
    } while (i < n && depth > 0);
    return s;
  };
  const readQuoted = () => {
    i++; // opening quote
    let s = '';
    let depth = 0;
    while (i < n) {
      const c = src[i];
      if (c === '{') depth++;
      if (c === '}') depth--;
      if (c === '"' && depth === 0) break;
      s += c;
      i++;
    }
    i++; // closing quote
    return s;
  };
  const readValue = () => {
    let out = '';
    for (;;) {
      skipWs();
      const c = src[i];
      if (c === '{') out += readBraced();
      else if (c === '"') out += readQuoted();
      else {
        const tok = readUntil(/[,}#\s]/).trim();
        out += /^\d+$/.test(tok) ? tok : (strings[tok] ?? tok);
      }
      skipWs();
      if (src[i] === '#') {
        i++;
        continue;
      }
      break;
    }
    return out;
  };

  while (i < n) {
    const at = src.indexOf('@', i);
    if (at < 0) break;
    i = at + 1;
    const type = readUntil(/[{(]/).trim().toLowerCase();
    if (!type) continue;
    i++; // opening brace
    if (type === 'comment' || type === 'preamble') {
      readUntil(/}/);
      i++;
      continue;
    }
    if (type === 'string') {
      skipWs();
      const name = readUntil(/[=\s]/).trim();
      skipWs();
      i++; // =
      strings[name] = readValue();
      readUntil(/}/);
      i++;
      continue;
    }
    skipWs();
    const key = readUntil(/,/).trim();
    i++;
    const fields = {};
    for (;;) {
      skipWs();
      if (i >= n || src[i] === '}') {
        i++;
        break;
      }
      const name = readUntil(/[=\s]/).trim().toLowerCase();
      skipWs();
      if (src[i] !== '=') break;
      i++;
      fields[name] = cleanValue(readValue());
      skipWs();
      if (src[i] === ',') i++;
    }
    entries.push({ type, key, fields });
  }
  return entries;
}

/** 중괄호 제거, 연속 공백 정리, 흔한 LaTeX 악센트 단순화 */
const ACCENTS = { '"': '\u0308', "'": '\u0301', '`': '\u0300', '^': '\u0302', '~': '\u0303', '=': '\u0304', '.': '\u0307' };
function cleanValue(v) {
  return v
    .replace(/\\(['"^`~=.])\s*\{?(\w)\}?/g, (_, acc, ch) => (ch + ACCENTS[acc]).normalize('NFC'))
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/--/g, '–')
    .trim();
}

/** "Last, First and First Last" → ["Last, F.", ...] */
export function formatAuthors(field, max = 3) {
  if (!field) return '';
  const authors = field.split(/\s+and\s+/i).map((a) => {
    a = a.trim();
    if (a.toLowerCase() === 'others') return 'et al.';
    let last, first;
    if (a.includes(',')) {
      [last, first] = a.split(',').map((s) => s.trim());
    } else {
      const parts = a.split(/\s+/);
      last = parts.pop();
      first = parts.join(' ');
    }
    const initials = (first || '')
      .split(/[\s.-]+/)
      .filter(Boolean)
      .map((p) => p[0].toUpperCase() + '.')
      .join(' ');
    return initials ? `${last}, ${initials}` : last;
  });
  const etal = authors.includes('et al.');
  const named = authors.filter((a) => a !== 'et al.');
  if (named.length > max) return named.slice(0, max).join(', ') + ' et al.';
  if (etal) return named.join(', ') + ' et al.';
  if (named.length === 2) return named.join(' and ');
  return named.join(', ');
}

/**
 * 항목을 한 줄 참고문헌 텍스트(HTML)로 서식화한다.
 * @param {BibEntry} e
 */
export function formatEntry(e) {
  const f = e.fields;
  const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const authors = esc(formatAuthors(f.author || f.editor));
  const year = f.year ? ` (${esc(f.year)})` : '';
  const title = f.title ? `<span class="bib-title">${esc(f.title)}</span>` : '';
  let venue = '';
  switch (e.type) {
    case 'article': {
      const j = f.journal ? `<em>${esc(f.journal)}</em>` : '';
      const vol = f.volume ? ` <b>${esc(f.volume)}</b>` : '';
      const pages = f.pages ? `, ${esc(f.pages)}` : '';
      venue = j + vol + pages;
      break;
    }
    case 'book':
      venue = [f.publisher, f.edition ? `${esc(f.edition)}판` : ''].filter(Boolean).map(esc).join(', ');
      break;
    case 'inbook':
    case 'incollection':
      venue = [f.booktitle ? `<em>${esc(f.booktitle)}</em>` : '', f.publisher ? esc(f.publisher) : ''].filter(Boolean).join(', ');
      break;
    case 'phdthesis':
      venue = `박사학위논문, ${esc(f.school)}`;
      break;
    default:
      venue = esc(f.howpublished || f.journal || f.booktitle || f.publisher || '');
  }
  const links = [];
  if (f.doi) links.push(`<a href="https://doi.org/${esc(f.doi)}" rel="noopener">doi:${esc(f.doi)}</a>`);
  if (f.eprint || f.arxiv) {
    const id = f.eprint || f.arxiv;
    links.push(`<a href="https://arxiv.org/abs/${esc(id)}" rel="noopener">arXiv:${esc(id)}</a>`);
  }
  if (f.url && !f.doi && !f.eprint) links.push(`<a href="${esc(f.url)}" rel="noopener">링크</a>`);
  return [authors + year, title, venue, links.join(' · ')].filter(Boolean).join('. ').replace(/\.\./g, '.');
}

/** @type {Map<string, BibEntry[]>} */
const cache = new Map();
/** 파일 경로에서 BibTeX를 읽어 key → entry 맵을 반환한다(빌드 중 캐시). */
export function loadBib(path) {
  const abs = new URL(path, `file://${process.cwd()}/`).pathname;
  const stat = fs.statSync(abs);
  const cacheKey = `${abs}:${stat.mtimeMs}`;
  if (!cache.has(cacheKey)) {
    cache.clear();
    cache.set(cacheKey, parseBibtex(fs.readFileSync(abs, 'utf8')));
  }
  return /** @type {BibEntry[]} */ (cache.get(cacheKey));
}

/**
 * 항목을 mdast 인라인 노드 배열로 서식화한다(MDX에서는 raw HTML을 쓸 수 없으므로).
 * @param {BibEntry} e
 */
export function formatEntryMdast(e) {
  const f = e.fields;
  const t = (value) => ({ type: 'text', value });
  const em = (value) => ({ type: 'emphasis', children: [t(value)] });
  const b = (value) => ({ type: 'strong', children: [t(value)] });
  const a = (url, value) => ({ type: 'link', url, children: [t(value)] });
  /** @type {any[]} */
  const out = [];
  const authors = formatAuthors(f.author || f.editor);
  if (authors) out.push(t(authors));
  if (f.year) out.push(t(` (${f.year})`));
  if (out.length) out.push(t('. '));
  if (f.title) out.push({ type: 'strong', data: { hProperties: { className: ['bib-title'] } }, children: [t(f.title)] }, t('. '));
  switch (e.type) {
    case 'article':
      if (f.journal) out.push(em(f.journal));
      if (f.volume) out.push(t(' '), b(f.volume));
      if (f.pages) out.push(t(`, ${f.pages}`));
      out.push(t('. '));
      break;
    case 'book':
      if (f.publisher) out.push(t(f.publisher));
      if (f.edition) out.push(t(`, ${f.edition}판`));
      out.push(t('. '));
      break;
    case 'inbook':
    case 'incollection':
      if (f.booktitle) out.push(em(f.booktitle));
      if (f.publisher) out.push(t(`, ${f.publisher}`));
      out.push(t('. '));
      break;
    case 'phdthesis':
      out.push(t(`박사학위논문, ${f.school ?? ''}. `));
      break;
    default: {
      const v = f.howpublished || f.journal || f.booktitle || f.publisher;
      if (v) out.push(t(`${v}. `));
    }
  }
  const links = [];
  if (f.doi) links.push(a(`https://doi.org/${f.doi}`, `doi:${f.doi}`));
  const eprint = f.eprint || f.arxiv;
  if (eprint) links.push(a(`https://arxiv.org/abs/${eprint}`, `arXiv:${eprint}`));
  if (f.url && !f.doi && !eprint) links.push(a(f.url, '링크'));
  links.forEach((l, i) => {
    if (i > 0) out.push(t(' · '));
    out.push(l);
  });
  return out;
}
