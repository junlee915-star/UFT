# 집필 규격

이 문서는 콘텐츠 파일 하나를 쓰는 데 필요한 모든 규칙을 담는다.
`node scripts/validate-content.mjs` 가 여기 적힌 규칙 대부분을 자동으로 검사하며, 실패하면 빌드가 멈춘다.

## 파일 위치와 이름

| 종류 | 경로 | 파일명 | 확장자 |
| --- | --- | --- | --- |
| 단원 | `src/content/lessons/` | 단원 id (`a1-3.mdx`) | `.mdx` 고정 |
| 위키 항목 | `src/content/wiki/` | slug (`gauge-symmetry.md`) | `.md` |
| 연구 노트 | `src/content/notes/` | 날짜-제목 | `.md` |
| 논문 요약 | `src/content/papers/` | 저자-연도 | `.md` |
| 개념 글 | `src/content/essays/` | slug | `.md` |
| 모듈 | `src/content/modules/` | 모듈 id (`a1.yaml`) | `.yaml` |
| 트랙 | `src/content/tracks/` | 트랙 slug | `.yaml` |

단원 id 는 `a1-3` 형식이고 사이트 전역에서 고유하다. `a`=물리학, `b`=종교·철학, `c`=통합.
단원은 전용 컴포넌트를 쓰므로 반드시 `.mdx` 다.

## 단원 front matter

```yaml
id: a1-3                 # 파일명과 같아야 한다
track: physics           # physics | philosophy | synthesis (id 접두사와 일치)
module: a1               # id 접두사와 일치
order: 3                 # 모듈 안 순서, 겹치면 안 된다
title: 뇌터 정리 I · 연속대칭
summary: 한 줄 요지. 300자 이하. 카드와 메타 설명에 쓰인다.
level: intermediate      # intro | intermediate | advanced
status: review           # draft(배포 제외) | review(경고 배너) | verified
prereq: [a1-1]           # 선수 단원 id. 실재해야 하고 사이클이 없어야 한다
wikiRefs: [a, b, c]      # 위키 slug 3개 이상, 모두 실재해야 한다
citations: [noether1918] # references.bib 의 키. 3건 이상 권장
estMinutes: 150
author: Jun Lee
created: 2026-09-19
aiAssisted: draft        # none | outline | draft | translation (본문 하단에 표시된다)
tags: [뇌터 정리, 대칭]
```

트랙 B 는 여기에 `primarySources` 를 1개 이상 더한다.

```yaml
primarySources:
  - work: Religion and Science
    author: Ian G. Barbour
    locus: 1부 3장
    edition: HarperOne 1997
    language: 영어
```

트랙 C 는 `groundedIn` 1개 이상과 `claimType` 을 더한다.

```yaml
groundedIn: [a1-3, b0-1]   # 트랙 A 또는 B 단원만. 본문 <Grounds> 의 ids 와 같아야 한다
claimType: comparative     # comparative | conceptual | proposal
```

트랙 C 단원은 `status: verified` 를 쓸 수 없다. 자기 가설은 원칙상 검증된 지식이 아니다.

## 단원 본문 구조

섹션 이름과 순서를 바꾸지 않는다. 1번(한 줄 요지)은 front matter `summary` 이고,
개념 연결 섹션은 `wikiRefs` 에서 자동 생성되므로 본문에 쓰지 않는다.

| # | 트랙 A 물리 | 트랙 B 종교·철학 | 트랙 C 통합 |
| --- | --- | --- | --- |
| 2 | `<Gist>` 수식 없는 요지 | 문제 상황 | `<Grounds>` 근거 단원 |
| 3 | 동기 · 이 수식 없이 설명하지 못한 것 | 원전 발췌 `<Source>` | 다룰 질문 |
| 4 | 핵심 수식 (번호 부여) | 논증 재구성 (전제-결론 번호) | 물리학 쪽 사실 |
| 5 | 유도 (생략 금지) | 반론과 재반론 | 형이상학 쪽 입장들 |
| 6 | 예제 1~2개 | 물리학과의 접점 (표시만, 주장 금지) | 대조와 정리 |
| 7 | 연습문제 `<Problem>` 2~5개 | 연습문제 2~3개 | 논증 가능/불가능 + 과제 |
| 9 | 더 읽기 | 더 읽기 | 더 읽기 |

## 분량과 개수

| 항목 | 기준 |
| --- | --- |
| 본문 | 공백 제외 2,500~6,000자. 넘치면 단원을 나눈다 |
| 번호 부여 수식 | 단원당 12개 이하 |
| 연습문제 | 물리 2~5개, 철학 2~3개. 모든 문제에 해설 필수 |
| 위키 연결 | 단원당 3개 이상 |
| 인용 | 단원당 3건 이상, 트랙 B 는 원전 1건 이상 |
| 그림 | 직접 제작한 SVG 만. 교과서 스캔 금지 |

## 수식

```
$$
j^\mu = \frac{\partial\lag}{\partial(\partial_\mu\phi)}\,\Delta\phi - \mathcal J^\mu \label{noether}
$$
```

- 표시 수식 `$$...$$` 에는 번호가 자동으로 붙는다.
- 다시 부를 식에는 `\label{이름}` 을 달고 본문에서 `@eq:이름` 으로 참조한다. `(3)` 같은 링크가 된다.
- 번호를 붙이지 않으려면 식 끝에 `\notag`.
- 매크로: `\dd`(로만체 d), `\lag`(𝓛), `\tr`(trace). `astro.config.mjs` 에서 추가한다.
- 기호는 처음 나올 때 한글 이름을 준다.

## 인용

- 본문에서 `[@noether1918]` 또는 `[@a; @b]` 로 쓰면 `[1]` 번호 링크가 되고 글 끝에 참고문헌 절이 자동 생성된다.
- 키가 `src/data/references.bib` 에 없으면 빌드가 실패한다. 새 문헌은 먼저 bib 에 추가한다.
- front matter `citations` 에도 같은 키를 적는다. 참고문헌 페이지의 역인용이 이 필드를 쓴다.

## 내부 링크

콘텐츠 파일에는 항상 루트 기준 경로로 쓴다. 하위 경로 배포의 base 는 빌드가 붙인다.

```markdown
[게이지 대칭](/wiki/gauge-symmetry)
[A1-3](/learn/physics/a1/a1-3)
```

링크를 걸면 대상 글에 역링크가 자동으로 표시된다.

## 전용 컴포넌트

MDX 에서 import 없이 바로 쓴다.

```mdx
<Gist>
수식을 읽지 않는 독자를 위한 3~5문장. 트랙 A 단원에 필수.
</Gist>

<Source work="에티카" author="스피노자" locus="1부 정리 14" edition="개정판 2014"
        lang="라틴어" original="Praeter Deum nulla dari neque concipi potest substantia.">
신 이외에는 어떤 실체도 주어질 수 없고 파악될 수도 없다.
</Source>

<Problem n={1} type="유도형">
문제 본문.
<Solution>
해설. 정답만 주지 않고 흔한 오류 하나와 그 오류가 왜 그럴듯한지까지 쓴다.
</Solution>
</Problem>

<Claims caption="설명" claims={[
  { id: 'P1', text: '부정 가능한 문장', kind: 'physical', test: '무엇으로 부정되는가' },
  { id: 'P2', text: '...', kind: 'metaphysical', test: '어떤 논증이 지지하는가' },
]} />

<Prereq ids={['a1-1']} />
<Grounds ids={['a1-3', 'b0-1']} />
```

- 트랙 A 단원은 `<Gist>` 없이 검사를 통과하지 못한다.
- 트랙 B 단원은 `<Source>` 없이 통과하지 못한다.
- 트랙 C 단원은 `<Grounds>` 없이 통과하지 못하고, 그 ids 는 `groundedIn` 과 같아야 한다.
- 선수 단원 배너는 front matter `prereq` 에서 자동 생성되므로 본문에 `<Prereq>` 를 또 쓰지 않는다.

## MDX 에서 조심할 것

- 본문에 `<` 를 그대로 쓰면 JSX 태그로 읽힌다. 수식 안에 넣거나 `&lt;` 로 쓴다.
- 중괄호 `{ }` 도 표현식으로 읽힌다. 수식 `$...$` 안은 안전하다.
- 표 안에서는 `|` 를 `\|` 로 escape 한다.

## 위키 항목 front matter

```yaml
titleKo: 게이지 대칭
titleEn: Gauge symmetry
summary: 한 문장 정의. 300자 이하
aliases: [국소 대칭]
tracks: [physics]            # 이 항목을 쓰는 트랙. 1개 이상
related: [covariant-derivative]  # 실재하는 slug 만
citations: [yang1954]
level: intermediate
status: verified
tags: [게이지 대칭]
created: 2026-09-19
aiAssisted: draft
```

본문 구조는 정의 → 핵심 수식 또는 성질 → 관련 개념과의 관계. 한 항목은 한 개념만 다룬다.

## 검토 상태 올리는 기준

- `draft` → `review`: 글이 완결되고 인용이 모두 달렸다.
- `review` → `verified`: 물리 단원은 수식 유도를 다시 직접 풀었고, 철학 단원은 원전을 대조했다.
- 트랙 C 단원과 `aiAssisted` 가 `draft`/`translation` 인 글은 사람 확인 전까지 `verified` 로 올리지 않는다.

## 쓰고 나서

```bash
node scripts/validate-content.mjs   # 교차 참조 검사 (빌드 없이 빠르게)
npm run build                       # 검사 + 빌드 + 검색 인덱스
```
