// 마크다운 본문의 루트 절대 링크(/wiki/...)에 배포 base 경로를 붙인다.
// 콘텐츠 파일은 항상 "/"를 기준으로 쓰고, 하위 경로 배포(예: GitHub Pages /UFT)는 빌드 시 처리한다.
import { visit } from 'unist-util-visit';

/** @param {{ base: string }} options */
export function rehypeBaseLinks({ base }) {
  const prefix = base.replace(/\/$/, '');
  return (tree) => {
    if (!prefix) return;
    visit(tree, 'element', (node) => {
      const href = node.properties?.href;
      if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//') && !href.startsWith(prefix + '/')) {
        node.properties.href = prefix + href;
      }
    });
  };
}
