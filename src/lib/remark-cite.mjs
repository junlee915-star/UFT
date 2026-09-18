// 본문 인용 `[@key]` / `[@key1; @key2]` → 번호 링크 [n], 문서 끝에 "참고문헌" 절 자동 생성.
import { visit } from 'unist-util-visit';
import { loadBib, formatEntryMdast } from './bibtex.mjs';

const CITE_RE = /\[@([^\]]+)\]/g;

/** @param {{ bibPath: string, heading?: string }} options */
export function remarkCite(options) {
  const heading = options.heading ?? '참고문헌';
  return (tree, file) => {
    const bib = loadBib(options.bibPath);
    const byKey = new Map(bib.map((e) => [e.key, e]));
    /** @type {string[]} 첫 등장 순서 */
    const cited = [];
    const numberOf = (key) => {
      let idx = cited.indexOf(key);
      if (idx < 0) {
        cited.push(key);
        idx = cited.length - 1;
      }
      return idx + 1;
    };

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === null) return;
      if (parent.type === 'link' || parent.type === 'inlineCode') return;
      if (!CITE_RE.test(node.value)) return;
      CITE_RE.lastIndex = 0;
      const parts = [];
      let last = 0;
      for (const m of node.value.matchAll(CITE_RE)) {
        if (m.index > last) parts.push({ type: 'text', value: node.value.slice(last, m.index) });
        const keys = m[1]
          .split(/[;,]/)
          .map((k) => k.trim().replace(/^@/, ''))
          .filter(Boolean);
        const linkNodes = [];
        keys.forEach((key, i) => {
          if (!byKey.has(key)) file.message(`참고문헌 키를 찾을 수 없음: ${key}`, node);
          const num = numberOf(key);
          if (i > 0) linkNodes.push({ type: 'text', value: ',' });
          linkNodes.push({
            type: 'link',
            url: `#ref-${key}`,
            data: { hProperties: { className: ['cite'], title: byKey.get(key)?.fields.title ?? key } },
            children: [{ type: 'text', value: String(num) }],
          });
        });
        parts.push({ type: 'text', value: '[' }, ...linkNodes, { type: 'text', value: ']' });
        last = m.index + m[0].length;
      }
      if (last < node.value.length) parts.push({ type: 'text', value: node.value.slice(last) });
      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });

    if (cited.length === 0) return;

    const items = cited.map((key) => {
      const e = byKey.get(key);
      const children = e
        ? formatEntryMdast(e)
        : [{ type: 'text', value: `알 수 없는 참고문헌 키: ${key}` }];
      return {
        type: 'listItem',
        spread: false,
        data: { hProperties: { id: `ref-${key}` } },
        children: [{ type: 'paragraph', children }],
      };
    });
    tree.children.push(
      {
        type: 'heading',
        depth: 2,
        data: { hProperties: { id: 'references', className: ['references-heading'] } },
        children: [{ type: 'text', value: heading }],
      },
      {
        type: 'list',
        ordered: true,
        start: 1,
        spread: false,
        data: { hProperties: { className: ['references'] } },
        children: items,
      },
    );
    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    file.data.astro.frontmatter.citedKeys = cited;
  };
}
