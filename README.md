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

프로덕션은 **Cloudflare Pages**다. `main`에 푸시하면 GitHub Actions(`.github/workflows/deploy-cloudflare.yml`)가 검사·빌드한 뒤 Cloudflare에 직접 업로드한다. PR은 미리보기 배포로 올라간다.

### 최초 1회 설정

Cloudflare 자격 증명이 저장소에 없으면 워크플로는 빌드까지만 하고 배포 단계를 건너뛴다(경고 표시). 아래를 한 번 해 두면 이후로는 자동이다.

1. **Pages 프로젝트 생성** — 로컬에서 `npx wrangler login` 후
   ```bash
   npx wrangler pages project create uft-study --production-branch=main
   ```
   이름 `uft-study`는 `wrangler.jsonc`의 `name`과 같아야 하고, `<name>.pages.dev` 주소는 전역에서 고유해야 한다. 이미 쓰이는 이름이면 `wrangler.jsonc`와 워크플로의 `SITE_URL` 기본값을 함께 바꾼다.
2. **API 토큰 발급** — Cloudflare 대시보드 → My Profile → API Tokens → Create Token, 권한은 **Account · Cloudflare Pages · Edit**.
3. **GitHub 시크릿 등록** — 저장소 Settings → Secrets and variables → Actions:
   ```bash
   gh secret set CLOUDFLARE_API_TOKEN
   gh secret set CLOUDFLARE_ACCOUNT_ID   # 대시보드 우측 또는 `npx wrangler whoami`
   ```

대시보드에서 Git 저장소를 직접 연결하는 방법(빌드 명령 `npm run build`, 출력 `dist`)도 쓸 수 있지만, 그 경우 이 워크플로와 배포가 중복되므로 둘 중 하나만 쓴다.

### 로컬에서 수동 배포

```bash
npx wrangler login
npm run deploy      # 빌드 후 wrangler pages deploy
```

### 도메인과 경로

- 기본 주소는 `https://uft-study.pages.dev`이며 **도메인 루트**에서 서비스된다(`BASE_PATH=/`).
- 커스텀 도메인을 붙이면 저장소 Variables에 `SITE_URL`을 등록한다(`gh variable set SITE_URL`). canonical URL, sitemap, RSS, robots.txt가 모두 이 값을 따른다.
- 하위 경로 배포(GitHub Pages 프로젝트 사이트 등)는 `BASE_PATH=/UFT`처럼 지정한다. 템플릿은 `withBase()`, 마크다운 본문 링크는 `rehype-base-links`가 경로를 붙이므로 콘텐츠 파일에는 항상 `/wiki/...`처럼 루트 기준으로 쓴다.
- 하위 경로로 로컬 확인: `BASE_PATH=/UFT npm run build && npm run preview` 후 http://localhost:4321/UFT
- `public/_headers`는 Cloudflare Pages 전용 캐시·보안 헤더다. 다른 호스트에서는 무시된다.

### 예전 배포 대상

GitHub Pages 워크플로(`deploy-github-pages.yml`)는 남겨 두었지만 수동 실행(workflow_dispatch)으로만 동작한다. 기존 주소 https://junlee915-star.github.io/UFT/ 는 마지막 배포 내용 그대로 남아 있으므로, Cloudflare 배포를 확인한 뒤 저장소 Settings → Pages에서 정리하면 된다.

## 기술 스택

Astro 7 · MDX · Tailwind CSS 4 · KaTeX(빌드 시 SSR) · Pagefind · Pretendard

## 라이선스

본문 CC BY-SA 4.0, 코드 MIT.
