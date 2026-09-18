#!/usr/bin/env node
/**
 * 콘텐츠 교차 참조 검사.
 *
 * Zod 스키마(src/content.config.ts)는 파일 하나 안에서 닫히는 규칙만 본다.
 * 파일 사이를 넘나드는 규칙 — 존재하지 않는 단원 id 를 선수로 걸었는지, 위키 slug 가
 * 실재하는지, 인용 키가 BibTeX 에 있는지, 선수 그래프에 사이클이 있는지 — 은 여기서 본다.
 *
 * PRD 「콘텐츠 스키마」의 검사 규칙 5개를 오류로 처리하고,
 * 「단원 템플릿과 콘텐츠 규격」의 분량·개수 기준은 경고로 처리한다.
 *
 * 사용: node scripts/validate-content.mjs [--strict]
 *   --strict 를 주면 경고도 실패로 처리한다.
 */
import fs from 'node:fs';
import path from 'node:path';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import { load as loadYaml } from 'js-yaml';
import { parseBibtex } from '../src/lib/bibtex.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONTENT = path.join(ROOT, 'src/content');
const BIB = path.join(ROOT, 'src/data/references.bib');
const STRICT = process.argv.includes('--strict');

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push({ file, msg });
const warn = (file, msg) => warnings.push({ file, msg });

/** 디렉터리 아래 확장자가 맞는 파일을 모두 모은다. */
function walk(dir, exts) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p, exts);
    return exts.includes(path.extname(e.name)) ? [p] : [];
  });
}

const rel = (p) => path.relative(ROOT, p);
const slugOf = (p) => path.basename(p).replace(/\.(md|mdx|yaml|yml)$/, '');

/** 마크다운 문서를 { id, file, data, body } 로 읽는다. */
function readDocs(dirName) {
  return walk(path.join(CONTENT, dirName), ['.md', '.mdx']).map((file) => {
    const raw = fs.readFileSync(file, 'utf8');
    let parsed;
    try {
      parsed = parseFrontmatter(raw);
    } catch (e) {
      err(rel(file), `front matter 를 읽을 수 없습니다: ${e.message}`);
      return { id: slugOf(file), file, data: {}, body: '' };
    }
    return { id: slugOf(file), file, data: parsed.frontmatter ?? {}, body: parsed.content ?? '' };
  });
}

/** YAML 데이터 파일을 { id, file, data } 로 읽는다. */
function readData(dirName) {
  return walk(path.join(CONTENT, dirName), ['.yaml', '.yml']).map((file) => {
    let data = {};
    try {
      data = loadYaml(fs.readFileSync(file, 'utf8')) ?? {};
    } catch (e) {
      err(rel(file), `YAML 을 읽을 수 없습니다: ${e.message}`);
    }
    return { id: slugOf(file), file, data };
  });
}

const tracks = readData('tracks');
const modules = readData('modules');
const lessons = readDocs('lessons');
const wiki = readDocs('wiki');
const notes = readDocs('notes');
const papers = readDocs('papers');
const essays = readDocs('essays');

const trackIds = new Set(tracks.map((t) => t.id));
const moduleIds = new Set(modules.map((m) => m.id));
const lessonIds = new Set(lessons.map((l) => l.id));
const wikiSlugs = new Set(wiki.map((w) => w.id));

let bibKeys = new Set();
try {
  bibKeys = new Set(parseBibtex(fs.readFileSync(BIB, 'utf8')).map((e) => e.key));
} catch (e) {
  err(rel(BIB), `BibTeX 파일을 읽을 수 없습니다: ${e.message}`);
}

/* ---------------------------------------------------------------- *
 * 트랙과 모듈
 * ---------------------------------------------------------------- */
for (const m of modules) {
  const f = rel(m.file);
  if (!trackIds.has(m.data.track)) err(f, `track "${m.data.track}" 이 src/content/tracks 에 없습니다.`);
  for (const p of m.data.prereqModules ?? []) {
    if (!moduleIds.has(p)) err(f, `prereqModules 의 "${p}" 모듈이 없습니다.`);
  }
}

// 규칙 5 의 모듈판: 선수 모듈 그래프에 사이클이 없어야 한다.
detectCycles(
  modules.map((m) => [m.id, m.data.prereqModules ?? []]),
  '모듈 선수 관계',
);

/* ---------------------------------------------------------------- *
 * 단원
 * ---------------------------------------------------------------- */
const LETTER_TO_TRACK = { a: 'physics', b: 'philosophy', c: 'synthesis' };
const seenOrder = new Map(); // module -> Map(order -> id)

for (const l of lessons) {
  const f = rel(l.file);
  const d = l.data;

  // id 는 파일명과 같아야 한다. 트랙 C 가 근거로 가리키는 키이므로 어긋나면 링크가 깨진다.
  if (d.id !== l.id) err(f, `front matter 의 id "${d.id}" 가 파일명 "${l.id}" 과 다릅니다.`);

  if (!moduleIds.has(d.module)) err(f, `module "${d.module}" 이 src/content/modules 에 없습니다.`);
  const mod = modules.find((m) => m.id === d.module);
  if (mod && mod.data.track !== d.track) {
    err(f, `track "${d.track}" 이 모듈 ${d.module} 의 track "${mod.data.track}" 과 다릅니다.`);
  }
  if (LETTER_TO_TRACK[String(d.id)[0]] !== d.track) {
    err(f, `id 접두사와 track "${d.track}" 이 맞지 않습니다.`);
  }

  // 모듈 안에서 order 가 겹치면 목록 순서가 비결정적이 된다.
  if (!seenOrder.has(d.module)) seenOrder.set(d.module, new Map());
  const orders = seenOrder.get(d.module);
  if (orders.has(d.order)) err(f, `모듈 ${d.module} 안에서 order ${d.order} 가 ${orders.get(d.order)} 과 겹칩니다.`);
  else orders.set(d.order, l.id);

  // 규칙 1: prereq 와 groundedIn 의 모든 id 가 실재해야 한다.
  for (const p of d.prereq ?? []) {
    if (!lessonIds.has(p)) err(f, `prereq 의 단원 "${p}" 이 없습니다.`);
    else if (p === l.id) err(f, `prereq 가 자기 자신을 가리킵니다.`);
  }
  for (const g of d.groundedIn ?? []) {
    if (!lessonIds.has(g)) err(f, `groundedIn 의 단원 "${g}" 이 없습니다.`);
    else if (g === l.id) err(f, `groundedIn 이 자기 자신을 가리킵니다.`);
    else if (String(g)[0] === 'c') err(f, `groundedIn "${g}" 은 트랙 C 단원입니다. 근거는 트랙 A 또는 B 단원이어야 합니다.`);
  }

  // 규칙 2: wikiRefs 의 slug 가 실재하고 3개 이상이어야 한다.
  for (const w of d.wikiRefs ?? []) {
    if (!wikiSlugs.has(w)) err(f, `wikiRefs 의 위키 항목 "${w}" 이 없습니다.`);
  }
  if ((d.wikiRefs ?? []).length < 3) err(f, `wikiRefs 는 3개 이상이어야 합니다. 현재 ${(d.wikiRefs ?? []).length}개.`);

  // 규칙 3: citations 의 키가 BibTeX 에 있어야 한다.
  for (const c of d.citations ?? []) {
    if (!bibKeys.has(c)) err(f, `citations 의 인용 키 "${c}" 가 references.bib 에 없습니다.`);
  }

  // 규칙 4: 트랙별 필수 필드.
  if (d.track === 'philosophy' && (d.primarySources ?? []).length === 0) {
    err(f, '트랙 B 단원은 primarySources 가 1개 이상이어야 합니다.');
  }
  if (d.track === 'synthesis' && (d.groundedIn ?? []).length === 0) {
    err(f, '트랙 C 단원은 groundedIn 이 1개 이상이어야 합니다.');
  }

  // 교육과정 원칙을 강제하는 컴포넌트. 비어 있으면 배포 전 검사에서 실패한다.
  if (d.track === 'physics' && !/<Gist\b/.test(l.body)) {
    err(f, '트랙 A 단원에는 <Gist> (수식 없는 요지) 박스가 있어야 합니다.');
  }
  if (d.track === 'philosophy' && !/<Source\b/.test(l.body)) {
    err(f, '트랙 B 단원에는 <Source> (원전 인용) 박스가 있어야 합니다.');
  }
  if (d.track === 'synthesis' && !/<Grounds\b/.test(l.body)) {
    err(f, '트랙 C 단원에는 <Grounds> (근거 단원) 배너가 있어야 합니다.');
  }

  // 본문 <Grounds> 의 id 목록은 front matter 의 groundedIn 과 같아야 한다.
  if (d.track === 'synthesis') {
    const m3 = l.body.match(/<Grounds\s+ids=\{\[([^\]]*)\]\}/);
    if (m3) {
      const inBody = m3[1].split(',').map((x) => x.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
      const declared = [...(d.groundedIn ?? [])].sort().join(',');
      if (inBody.slice().sort().join(',') !== declared) {
        err(f, `<Grounds> 의 id (${inBody.join(', ')}) 가 front matter 의 groundedIn (${(d.groundedIn ?? []).join(', ')}) 과 다릅니다.`);
      }
    }
  }

  // 컴포넌트를 쓰려면 MDX 여야 한다.
  if (path.extname(l.file) !== '.mdx' && /<(Gist|Source|Problem|Claims|Prereq|Grounds)\b/.test(l.body)) {
    err(f, '전용 컴포넌트를 쓰는 단원은 확장자가 .mdx 여야 합니다.');
  }

  // 수식 상호 참조는 파일 안에서만 해소된다. 다른 단원의 라벨을 가리키면 (?) 로 렌더된다.
  {
    const labels = new Set([...l.body.matchAll(/\\label\{([^}]+)\}/g)].map((m) => m[1]));
    for (const m of l.body.matchAll(/@eq:([A-Za-z0-9_:-]+)/g)) {
      if (!labels.has(m[1])) {
        err(f, `@eq:${m[1]} 에 맞는 \\label{${m[1]}} 이 같은 단원에 없습니다. 다른 단원의 수식은 산문과 링크로 가리키세요.`);
      }
    }
  }

  // 분량과 개수 규격 (경고)
  const chars = l.body.replace(/\s/g, '').length;
  if (chars > 6000) warn(f, `본문 ${chars}자. 6,000자를 넘으면 단원을 나눕니다.`);
  else if (chars < 2500 && d.status !== 'draft') warn(f, `본문 ${chars}자. 공개 단원은 2,500자 이상을 기준으로 합니다.`);

  const numbered = (l.body.match(/\\label\{/g) ?? []).length;
  if (numbered > 12) warn(f, `번호 부여 수식 ${numbered}개. 단원당 12개 이하를 기준으로 합니다.`);

  const problems = (l.body.match(/<Problem\b/g) ?? []).length;
  const [lo, hi] = d.track === 'philosophy' ? [2, 3] : d.track === 'physics' ? [2, 5] : [1, 5];
  if (d.status !== 'draft' && (problems < lo || problems > hi)) {
    warn(f, `연습문제 ${problems}개. 이 트랙 기준은 ${lo}~${hi}개입니다.`);
  }
  // 모든 문제에 해설이 붙어야 한다.
  for (const m2 of l.body.matchAll(/<Problem\b([^>]*)>([\s\S]*?)<\/Problem>/g)) {
    if (!/<Solution\b|해설/.test(m2[2])) err(f, '해설이 없는 <Problem> 이 있습니다.');
  }

  if (d.status !== 'draft' && (d.citations ?? []).length < 3) {
    warn(f, `인용 ${(d.citations ?? []).length}건. 단원당 3건 이상을 기준으로 합니다.`);
  }
}

// 규칙 5: 선수 단원 그래프에 사이클이 없어야 한다.
detectCycles(
  lessons.map((l) => [l.id, [...(l.data.prereq ?? []), ...(l.data.groundedIn ?? [])]]),
  '단원 선수·근거 관계',
);

/* ---------------------------------------------------------------- *
 * 위키, 노트, 논문 요약, 개념 글
 * ---------------------------------------------------------------- */
for (const w of wiki) {
  const f = rel(w.file);
  for (const r of w.data.related ?? []) {
    if (!wikiSlugs.has(r)) err(f, `related 의 위키 항목 "${r}" 이 없습니다.`);
    else if (r === w.id) err(f, 'related 가 자기 자신을 가리킵니다.');
  }
  for (const c of w.data.citations ?? []) {
    if (!bibKeys.has(c)) err(f, `citations 의 인용 키 "${c}" 가 references.bib 에 없습니다.`);
  }
  for (const t of w.data.tracks ?? []) {
    if (!trackIds.has(t)) err(f, `tracks 의 "${t}" 트랙이 없습니다.`);
  }
}

for (const p of papers) {
  if (!p.data.arxivId && !p.data.doi && !p.data.url) {
    err(rel(p.file), '원문 링크가 없습니다. arxivId, doi, url 중 하나는 반드시 있어야 합니다.');
  }
  // 2010.16098 처럼 따옴표 없이 쓴 arXiv ID 는 YAML 이 소수로 읽어 뒤 0 이 잘린다.
  if (p.data.arxivId !== undefined && typeof p.data.arxivId !== 'string') {
    err(rel(p.file), `arxivId 를 큰따옴표로 감싸세요. 지금은 ${typeof p.data.arxivId} 로 읽힙니다.`);
  }
  if (p.data.year !== undefined && !Number.isInteger(p.data.year)) {
    err(rel(p.file), 'year 는 정수여야 합니다.');
  }
}

for (const doc of [...notes, ...papers, ...essays]) {
  const f = rel(doc.file);
  for (const w of doc.data.wikiRefs ?? []) {
    if (!wikiSlugs.has(w)) err(f, `wikiRefs 의 위키 항목 "${w}" 이 없습니다.`);
  }
  for (const c of doc.data.citations ?? []) {
    if (!bibKeys.has(c)) err(f, `citations 의 인용 키 "${c}" 가 references.bib 에 없습니다.`);
  }
  if (doc.data.bibKey && !bibKeys.has(doc.data.bibKey)) {
    err(f, `bibKey "${doc.data.bibKey}" 가 references.bib 에 없습니다.`);
  }
}

// 본문에서 직접 쓴 인용 [@key] 도 BibTeX 에 있어야 한다.
for (const doc of [...lessons, ...wiki, ...notes, ...papers, ...essays]) {
  for (const m of doc.body.matchAll(/\[@([^\]]+)\]/g)) {
    for (const key of m[1].split(/[;,]/).map((s) => s.trim().replace(/^@/, ''))) {
      if (key && !bibKeys.has(key)) err(rel(doc.file), `본문 인용 "[@${key}]" 가 references.bib 에 없습니다.`);
    }
  }
}

/* ---------------------------------------------------------------- *
 * 사이클 탐지
 * ---------------------------------------------------------------- */
function detectCycles(pairs, label) {
  const graph = new Map(pairs);
  const state = new Map(); // 0 미방문, 1 방문 중, 2 완료
  const stack = [];
  const reported = new Set();

  const visit = (node) => {
    if (state.get(node) === 2) return;
    if (state.get(node) === 1) {
      const cycle = stack.slice(stack.indexOf(node)).concat(node).join(' → ');
      if (!reported.has(cycle)) {
        reported.add(cycle);
        err(label, `사이클이 있습니다: ${cycle}`);
      }
      return;
    }
    state.set(node, 1);
    stack.push(node);
    for (const next of graph.get(node) ?? []) if (graph.has(next)) visit(next);
    stack.pop();
    state.set(node, 2);
  };
  for (const [node] of graph) visit(node);
}

/* ---------------------------------------------------------------- *
 * 결과 출력
 * ---------------------------------------------------------------- */
const counts = `트랙 ${tracks.length} · 모듈 ${modules.length} · 단원 ${lessons.length} · 위키 ${wiki.length} · 노트 ${notes.length} · 논문 ${papers.length} · 개념 글 ${essays.length} · 인용 키 ${bibKeys.size}`;

const group = (items) => {
  const byFile = new Map();
  for (const { file, msg } of items) byFile.set(file, [...(byFile.get(file) ?? []), msg]);
  return [...byFile.entries()].sort((a, b) => a[0].localeCompare(b[0]));
};

for (const [file, msgs] of group(warnings)) {
  console.warn(`\n  ⚠ ${file}`);
  for (const m of msgs) console.warn(`    - ${m}`);
}
for (const [file, msgs] of group(errors)) {
  console.error(`\n  ✗ ${file}`);
  for (const m of msgs) console.error(`    - ${m}`);
}

console.log(`\n콘텐츠 검사: ${counts}`);
console.log(`오류 ${errors.length}건, 경고 ${warnings.length}건`);

if (errors.length > 0 || (STRICT && warnings.length > 0)) {
  console.error('\n콘텐츠 검사 실패. 위 항목을 고친 뒤 다시 빌드하세요.');
  process.exit(1);
}
