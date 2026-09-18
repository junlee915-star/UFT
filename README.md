# 통일장이론 교육과정

통일장이론(Unified Field Theory)을 **물리학**과 **종교·철학** 두 갈래로 가르치고, 통합은 전용 트랙에서만 하는 한국어 정적 사이트.
설계 근거는 [docs/PRD.md](docs/PRD.md), 글 쓰는 규칙은 [docs/AUTHORING.md](docs/AUTHORING.md)에 있다.
대체된 초기 PRD 는 [docs/PRD-v1.md](docs/PRD-v1.md) 에 기록으로 남아 있다.

- 사이트: https://uft-study.pages.dev
- 저장소: https://github.com/junlee915-star/UFT

## 왜 트랙을 나누는가

물리학만 가르치면 통합 관점의 언어가 없고, 철학만 가르치면 물리학 주장의 진위를 판별할 수 없다.
두 트랙을 따로 세우고 통합을 전용 트랙에서만 하는 이유는 범주 오류를 **구조적으로** 막기 위해서다.
물리 단원은 신학적 결론을 끌어내지 않고, 신학 단원은 물리 수식을 논거로 쓰지 않는다.
이 규칙은 권고가 아니라 빌드 검사로 강제된다.

| 트랙 | 모듈 | 다루는 것 |
| --- | --- | --- |
| A 물리학 | A0~A5 | 수학 도구, 고전 장이론, 장의 양자화, 게이지 이론과 표준모형, 대통일, 양자중력 |
| B 종교·철학 | B0~B4 | 방법론과 범주 통제, 형이상학 기초, 창조·우주론 신학, 통일 사유 전통, 의식·정보·법칙 |
| C 통합 | C1~C4 | 통일의 개념사, 대칭·법칙·필연, 근본성 논쟁, 연구 제안서 |

## 빠른 시작

```bash
npm install
npm run dev        # http://localhost:4321  (검색은 dev 서버에서 동작하지 않음)
npm run validate   # 콘텐츠 교차 참조 검사만 빠르게
npm run build      # 검사 + 빌드 + Pagefind 검색 인덱스
npm run preview    # 빌드 결과 확인 (검색 포함)
npm run check      # 타입·템플릿 검사
```

수식 플러그인(`src/lib/*.mjs`)을 고쳤는데 결과가 그대로면 콘텐츠 렌더 캐시 때문이다. `npm run build:clean` 으로 캐시를 지우고 빌드한다.

## 구조

```
src/
  content/
    tracks/*.yaml        트랙 3개 (physics, philosophy, synthesis)
    modules/*.yaml       모듈 15개 (a0~a5, b0~b4, c1~c4)
    lessons/*.mdx        단원. 파일명이 곧 전역 고유 id (a1-3.mdx)
    wiki/*.md            개념 위키. 두 트랙을 잇는 축
    notes/*.md           연구 노트
    papers/*.md          논문 요약
    essays/*.md          개념 글 (수식 없이 읽는 글)
  data/references.bib    참고문헌 DB 한 파일
  components/mdx/        단원 전용 컴포넌트 6종
  lib/
    remark-equations.mjs 표시 수식 자동 번호와 상호 참조
    remark-cite.mjs      [@key] 인용 → 번호 링크 + 참고문헌 절 자동 생성
    rehype-base-links.mjs 하위 경로 배포 시 본문 링크에 base 부착
    bibtex.mjs           BibTeX 파서와 서식
    content.ts           컬렉션 조회, 경로, 역링크, 태그
scripts/validate-content.mjs  교차 참조 검사 (빌드 전에 실행)
docs/AUTHORING.md             집필 규격
docs/templates/               새 글 템플릿
```

## 글쓰기 요약

자세한 것은 [docs/AUTHORING.md](docs/AUTHORING.md). 새 글은 `docs/templates/` 에서 복사해 시작한다.

| 하고 싶은 것 | 쓰는 법 |
| --- | --- |
| 표시 수식에 번호 | `$$ ... $$` 이면 자동. 라벨은 `\label{name}` |
| 수식 참조 | 본문에 `@eq:name` → `(n)` 링크 |
| 번호 없는 수식 | 식 끝에 `\notag` |
| 인용 | `[@peskin1995]` → `[1]`, 글 끝에 참고문헌 절 자동 생성 |
| 위키 링크 | `[게이지 대칭](/wiki/gauge-symmetry)` → 대상에 역링크 표시 |
| 수식 없는 요지 | `<Gist>` (트랙 A 필수) |
| 원전 인용 | `<Source work author locus original>` (트랙 B 필수) |
| 근거 단원 | `<Grounds ids={[...]} />` (트랙 C 필수, front matter 와 일치해야 함) |
| 연습문제 | `<Problem n type>` + `<Solution>` |
| 명제 분해표 | `<Claims claims={[...]} />` |
| 배포 제외 | front matter `status: draft` |

## 빌드가 강제하는 것

`npm run build` 는 `scripts/validate-content.mjs` 를 먼저 돌리고, 하나라도 걸리면 빌드하지 않는다.

1. `prereq` 와 `groundedIn` 의 모든 단원 id 가 실재한다.
2. `wikiRefs` 의 slug 가 실재하고 단원당 3개 이상이다.
3. `citations` 의 키가 `references.bib` 에 있다. 본문 `[@key]` 도 검사한다.
4. 트랙 B 단원은 `primarySources` 1개 이상, 트랙 C 단원은 `groundedIn` 1개 이상이다.
5. 선수·근거 그래프에 사이클이 없다.

여기에 더해 트랙 A 는 `<Gist>`, 트랙 B 는 `<Source>`, 트랙 C 는 `<Grounds>` 가 없으면 실패한다.
본문 분량, 수식 개수, 연습문제 개수, 인용 건수는 경고로 알린다.

## 학습 진도

서버가 없으므로 진도는 브라우저 `localStorage` 한 키에만 저장된다. 기기를 바꾸면 따라오지 않고 운영자도 볼 수 없다.
[소개 페이지](https://uft-study.pages.dev/about)에서 JSON 으로 내보내고 가져올 수 있다.

## 배포

프로덕션은 **Cloudflare Pages** 다. `main` 에 푸시하면 GitHub Actions(`.github/workflows/deploy-cloudflare.yml`)가 검사·빌드한 뒤 업로드한다. PR 은 미리보기 배포로 올라간다.

### 최초 1회 설정

Cloudflare 자격 증명이 없으면 워크플로는 빌드까지만 하고 배포를 건너뛴다(경고 표시).

1. **Pages 프로젝트 생성** — `npx wrangler login` 후
   ```bash
   npx wrangler pages project create uft-study --production-branch=main
   ```
   이름은 `wrangler.jsonc` 의 `name` 과 같아야 하고 `<name>.pages.dev` 는 전역에서 고유해야 한다.
2. **API 토큰 발급** — Cloudflare 대시보드 → My Profile → API Tokens, 권한은 **Account · Cloudflare Pages · Edit**.
3. **GitHub 시크릿 등록**
   ```bash
   gh secret set CLOUDFLARE_API_TOKEN
   gh secret set CLOUDFLARE_ACCOUNT_ID   # npx wrangler whoami
   ```

### 도메인과 경로

- 기본 주소는 도메인 루트에서 서비스된다(`BASE_PATH=/`).
- 커스텀 도메인을 붙이면 저장소 Variables 에 `SITE_URL` 을 등록한다. canonical, sitemap, RSS, robots.txt 가 모두 이 값을 따른다.
- 하위 경로 배포는 `BASE_PATH=/UFT` 처럼 지정한다. 콘텐츠 파일에는 항상 `/wiki/...` 처럼 루트 기준으로 쓰고, base 는 빌드가 붙인다.
- GitHub Pages 워크플로(`deploy-github-pages.yml`)는 남아 있지만 수동 실행 전용이다.

## 기술 스택

Astro 7 · MDX · Tailwind CSS 4 · KaTeX(빌드 시 SSR) · Pagefind · Mermaid · Pretendard

## 라이선스

본문 CC BY-SA 4.0, 코드 MIT. 그림은 직접 제작한 SVG 만 쓰고 교과서 스캔은 싣지 않는다.
