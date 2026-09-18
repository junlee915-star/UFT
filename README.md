# 통일장이론 연구·학습 사이트

통일장이론(Unified Field Theory)을 체계적으로 공부하고 연구 노트를 축적하는 한국어 정적 사이트.
[PRD](https://claude.ai/code/artifact/f42ded47-dba5-41f9-abec-bd692844b506)의 MVP(P0 기능 8개 + RSS·연습문제)를 구현한다.

## 빠른 시작

```bash
npm install
npm run dev        # http://localhost:4321  (검색은 dev 서버에서 동작하지 않음)
npm run build      # dist/ 생성 + Pagefind 검색 인덱스 생성
npm run preview    # 빌드 결과 확인 (검색 포함)
npm run check      # 타입·템플릿 검사
```

수식 플러그인(`src/lib/*.mjs`)을 수정했는데 결과가 바뀌지 않으면 콘텐츠 렌더 캐시 때문이다. `npm run build:clean`으로 캐시를 지우고 빌드한다.

## 구조

```
src/
  content/
    modules/*.yaml     학습 모듈 메타(제목, 순서, 선행 지식)
    learn/<module>/    학습 단원 (.md | .mdx)  → /learn/<module>/<unit>
    notes/             연구 노트               → /research/notes/<id>
    papers/            논문 요약               → /research/papers/<id>
    wiki/              수식 위키               → /wiki/<id>
  data/references.bib  참고문헌 DB (하나의 BibTeX 파일)
  lib/
    remark-equations.mjs   표시 수식 자동 번호·상호 참조
    remark-cite.mjs        [@key] 인용 → 번호 링크 + 참고문헌 절 자동 생성
    bibtex.mjs             BibTeX 파서·서식
    content.ts             컬렉션 조회, 역링크, 태그 헬퍼
  pages/               라우트
docs/templates/        새 글 템플릿 (복사해서 시작)
```

## 글쓰기 규칙

| 하고 싶은 것 | 쓰는 법 |
| --- | --- |
| 표시 수식에 번호 | `$$ ... $$` 이면 자동. 라벨은 `\label{name}` |
| 수식 참조 | 본문에 `@eq:name` → `(n)` 링크 |
| 번호 없는 수식 | 수식 끝에 `\notag` |
| 인용 | `[@peskin1995]` 또는 `[@a; @b]` → `[1]`, 글 끝에 참고문헌 절 자동 생성 |
| 위키 개념 링크 | `[게이지 대칭](/wiki/gauge-symmetry)` → 대상 항목에 역링크 표시 |
| 연습문제 해설 접기 | `<details><summary>해설</summary> ... </details>` |
| 배포 제외 | front matter `draft: true` (dev 서버에서는 보임) |
| 매크로 | `\dd`(d), `\lag`(𝓛), `\tr` — `astro.config.mjs`의 `macros`에서 추가 |

새 참고문헌은 `src/data/references.bib`에 항목을 추가한다(Zotero → BibTeX 내보내기 호환).
`.mdx`에서는 본문에 `{`, `}`, `<`를 직접 쓸 수 없으므로 수식이 많은 글은 `.md`를 권장한다.

## 배포

정적 출력(`dist/`)이므로 Cloudflare Pages, Vercel, GitHub Pages 어디든 올릴 수 있다.

- 빌드 명령 `npm run build`, 출력 디렉터리 `dist`
- 환경변수 `SITE_URL`에 실제 도메인을 넣으면 sitemap, RSS, canonical URL에 반영된다(기본값 `https://uft.example.com`).
- `public/robots.txt`의 Sitemap 주소도 도메인 확정 후 바꾼다.

## 기술 스택

Astro 7 · MDX · Tailwind CSS 4 · KaTeX(빌드 시 SSR) · Pagefind · Pretendard

## 라이선스

본문 CC BY-SA 4.0, 코드 MIT.
