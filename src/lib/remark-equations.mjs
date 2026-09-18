// 표시 수식 자동 번호 매기기와 상호 참조.
//  - $$ ... \label{name} $$  → 번호 (n)이 붙고 id="eq-name" 래퍼로 감싼다.
//  - $$ ... \notag $$        → 번호를 붙이지 않는다.
//  - 본문의 @eq:name          → (n)으로 링크된다.
import { visit } from 'unist-util-visit';

const LABEL_RE = /\\label\{([^}]+)\}/;
const NOTAG_RE = /\\(notag|nonumber)\b/;
const REF_RE = /@eq:([A-Za-z0-9_:-]+)/g;

/** mdast-util-math는 파싱 시점에 data.hChildren에 본문을 복사해 두므로 둘을 함께 갱신한다. */
function setMathValue(node, value) {
  node.value = value;
  const code = node.data?.hChildren?.[0];
  if (code?.children?.length) code.children = [{ type: 'text', value }];
}

export function remarkEquations() {
  return (tree, file) => {
    let n = 0;
    /** @type {Record<string, number>} */
    const labels = {};

    visit(tree, 'math', (node, index, parent) => {
      if (!parent || index === null) return;
      let value = node.value;
      if (NOTAG_RE.test(value)) {
        setMathValue(node, value.replace(NOTAG_RE, '').trim());
        return;
      }
      n += 1;
      const m = value.match(LABEL_RE);
      let id = `eq-${n}`;
      if (m) {
        labels[m[1]] = n;
        id = `eq-${m[1]}`;
        value = value.replace(LABEL_RE, '');
      }
      if (!/\\tag\b/.test(value)) value = `${value.trim()} \\tag{${n}}`;
      setMathValue(node, value);
      parent.children[index] = {
        type: 'equationWrapper',
        data: { hName: 'div', hProperties: { className: ['equation'], id, 'data-eq': String(n) } },
        children: [node],
      };
      return index + 1;
    });

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === null || !REF_RE.test(node.value)) return;
      REF_RE.lastIndex = 0;
      const parts = [];
      let last = 0;
      for (const m of node.value.matchAll(REF_RE)) {
        if (m.index > last) parts.push({ type: 'text', value: node.value.slice(last, m.index) });
        const num = labels[m[1]];
        parts.push({
          type: 'link',
          url: `#eq-${m[1]}`,
          data: { hProperties: { className: ['eqref'], title: `식 (${num ?? '?'})` } },
          children: [{ type: 'text', value: `(${num ?? '?'})` }],
        });
        if (num === undefined) file.message(`정의되지 않은 수식 라벨: ${m[1]}`, node);
        last = m.index + m[0].length;
      }
      if (last < node.value.length) parts.push({ type: 'text', value: node.value.slice(last) });
      parent.children.splice(index, 1, ...parts);
      return index + parts.length;
    });
  };
}
