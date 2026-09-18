import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ------------------------------------------------------------------ *
 * 공통 열거형
 * 값은 PRD 「콘텐츠 스키마」 절의 front matter 규격을 그대로 따른다.
 * ------------------------------------------------------------------ */

/** 트랙 A 물리학 / B 종교·철학 / C 통합 */
export const TRACK_IDS = ['physics', 'philosophy', 'synthesis'] as const;
const track = z.enum(TRACK_IDS);

/** 난이도 세 계단 */
const level = z.enum(['intro', 'intermediate', 'advanced']);

/** 검토 상태. draft 는 배포 제외, review 는 경고 배너와 함께 공개, verified 는 출처 확인 완료 */
const status = z.enum(['draft', 'review', 'verified']);

/** AI 보조 범위. 단원 하단에 그대로 표시한다 */
const aiAssisted = z.enum(['none', 'outline', 'draft', 'translation']).default('none');

/** 단원 id. 소문자 트랙 문자 + 모듈 번호 + 하이픈 + 단원 번호 (예: a1-3, b0-2, c1-1) */
const lessonId = z.string().regex(/^[abc]\d+-\d+$/, '단원 id 는 a1-3 형식이어야 합니다.');

/** 모듈 id (예: a1, b0, c2) */
const moduleId = z.string().regex(/^[abc]\d+$/, '모듈 id 는 a1 형식이어야 합니다.');

/** 위키 slug */
const wikiSlug = z.string().regex(/^[a-z0-9][a-z0-9-]*$/, 'slug 은 영소문자와 하이픈만 씁니다.');

/* ------------------------------------------------------------------ *
 * 트랙 (src/content/tracks/<slug>.yaml)
 * ------------------------------------------------------------------ */
const tracks = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/tracks' }),
  schema: z.object({
    /** 화면에 쓰는 트랙 글자 (A/B/C) */
    letter: z.enum(['A', 'B', 'C']),
    order: z.number().int(),
    title: z.string(),
    subtitle: z.string(),
    /** 트랙이 답하려는 질문 한 문장 */
    question: z.string(),
    summary: z.string(),
    /** 이 트랙을 읽기 위해 전제하는 배경 */
    assumes: z.array(z.string()).default([]),
  }),
});

/* ------------------------------------------------------------------ *
 * 모듈 (src/content/modules/<id>.yaml)
 * ------------------------------------------------------------------ */
const modules = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/modules' }),
  schema: z.object({
    track,
    order: z.number().int(),
    title: z.string(),
    summary: z.string(),
    /** 모듈을 마쳤을 때 학습자가 할 수 있어야 하는 것 */
    goal: z.string(),
    level,
    /** 선수 모듈 id. 트랙 C 모듈은 두 트랙에서 모두 지정할 수 있다 */
    prereqModules: z.array(moduleId).default([]),
    /** 모듈 체크포인트 과제 */
    checkpoint: z.string(),
  }),
});

/* ------------------------------------------------------------------ *
 * 단원 (src/content/lessons/**\/<id>.md|mdx)
 * ------------------------------------------------------------------ */
// 표시용 문자열 필드는 관대하게 받는다. `edition: 1973` 처럼 연도만 쓰면
// YAML 이 숫자로 읽기 때문에, 작성자에게 따옴표를 강요하는 대신 여기서 문자열로 바꾼다.
const displayText = z.coerce.string();

const primarySource = z.object({
  work: displayText,
  author: displayText,
  locus: displayText,
  edition: displayText.optional(),
  /** 원문 언어. 표기 폰트 보장에 쓴다 */
  language: displayText.optional(),
});

const lessons = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/lessons',
    // 파일이 어느 폴더에 있든 id 는 파일명이다. id 는 사이트 전역에서 고유하다.
    generateId: ({ entry }) => entry.replace(/^.*\//, '').replace(/\.(md|mdx)$/, ''),
  }),
  schema: z
    .object({
      id: lessonId,
      track,
      module: moduleId,
      order: z.number().int().positive(),
      title: z.string(),
      /** 템플릿 1번 섹션인 "한 줄 요지". 카드와 메타 설명에도 쓴다 */
      summary: z.string().max(300),
      level,
      status: status.default('draft'),
      /** 선수 단원 id 배열 */
      prereq: z.array(lessonId).default([]),
      /** 이 단원이 가리키는 위키 slug. 검증 규칙상 3개 이상 */
      wikiRefs: z.array(wikiSlug).default([]),
      /** BibTeX 인용 키 */
      citations: z.array(z.string()).default([]),
      estMinutes: z.number().int().positive(),
      author: z.string().default('Jun Lee'),
      created: z.coerce.date(),
      updated: z.coerce.date().optional(),
      aiAssisted,
      tags: z.array(z.string()).default([]),

      /** 트랙 B 전용: 지정 원전 */
      primarySources: z.array(primarySource).default([]),

      /** 트랙 C 전용: 근거로 삼은 단원 id */
      groundedIn: z.array(lessonId).default([]),
      claimType: z.enum(['comparative', 'conceptual', 'proposal']).optional(),
    })
    .superRefine((d, ctx) => {
      if (!d.id.startsWith(d.module + '-')) {
        ctx.addIssue({ code: 'custom', path: ['id'], message: `id "${d.id}" 가 module "${d.module}" 과 맞지 않습니다.` });
      }
      const letter = d.id[0];
      const expected = { a: 'physics', b: 'philosophy', c: 'synthesis' }[letter];
      if (expected !== d.track) {
        ctx.addIssue({ code: 'custom', path: ['track'], message: `id "${d.id}" 는 track "${expected}" 이어야 합니다.` });
      }
      // 교육과정 원칙 4: 트랙 B 는 1차 문헌을 직접 인용한다.
      if (d.track === 'philosophy' && d.primarySources.length === 0) {
        ctx.addIssue({ code: 'custom', path: ['primarySources'], message: '트랙 B 단원은 primarySources 가 1개 이상이어야 합니다.' });
      }
      // 교육과정 원칙 1: 트랙 C 의 주장은 근거 단원을 명시한다.
      if (d.track === 'synthesis') {
        if (d.groundedIn.length === 0) {
          ctx.addIssue({ code: 'custom', path: ['groundedIn'], message: '트랙 C 단원은 groundedIn 이 1개 이상이어야 합니다.' });
        }
        if (!d.claimType) {
          ctx.addIssue({ code: 'custom', path: ['claimType'], message: '트랙 C 단원은 claimType 이 필요합니다.' });
        }
      }
      // 트랙 C 산출물은 검증된 지식이 아니므로 verified 로 올리지 않는다.
      if (d.track === 'synthesis' && d.status === 'verified') {
        ctx.addIssue({ code: 'custom', path: ['status'], message: '트랙 C 단원은 verified 상태를 쓰지 않습니다.' });
      }
    }),
});

/* ------------------------------------------------------------------ *
 * 위키 항목 (src/content/wiki/<slug>.md)
 * ------------------------------------------------------------------ */
const wiki = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/wiki' }),
  schema: z.object({
    titleKo: z.string(),
    titleEn: z.string(),
    summary: z.string().max(300),
    aliases: z.array(z.string()).default([]),
    /** 이 항목을 쓰는 트랙. 두 트랙이 같은 항목을 가리키는 것이 통합의 축이다 */
    tracks: z.array(track).min(1),
    related: z.array(wikiSlug).default([]),
    citations: z.array(z.string()).default([]),
    status: status.default('draft'),
    level: level.default('intermediate'),
    tags: z.array(z.string()).default([]),
    created: z.coerce.date(),
    updated: z.coerce.date().optional(),
    aiAssisted,
  }),
});

/* ------------------------------------------------------------------ *
 * 연구 노트 (src/content/notes/<slug>.md)
 * ------------------------------------------------------------------ */
const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(300),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    wikiRefs: z.array(wikiSlug).default([]),
    citations: z.array(z.string()).default([]),
    status: status.default('draft'),
    author: z.string().default('Jun Lee'),
    aiAssisted,
  }),
});

/* ------------------------------------------------------------------ *
 * 논문 요약 (src/content/papers/<slug>.md)
 * ------------------------------------------------------------------ */
const papers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/papers' }),
  schema: z
    .object({
      titleKo: z.string(),
      titleOriginal: z.string(),
      authors: z.array(z.string()).min(1),
      year: z.number().int(),
      venue: z.string().optional(),
      arxivId: z.string().optional(),
      doi: z.string().optional(),
      url: z.url().optional(),
      /** 본문 맨 위에 쓰는 한국어 한 문단 요약 */
      summaryKo: z.string().max(400),
      wikiRefs: z.array(wikiSlug).default([]),
      bibKey: z.string().optional(),
      tags: z.array(z.string()).default([]),
      tracks: z.array(track).default(['physics']),
      status: status.default('draft'),
      created: z.coerce.date(),
      updated: z.coerce.date().optional(),
      aiAssisted,
    })
    // 원문 링크는 반드시 있어야 한다. DOI 이전 시대의 논문(예: 뇌터 1918)은
    // arxivId·doi 가 없으므로 해소 가능한 url 을 대신 받는다.
    .refine((p) => p.arxivId || p.doi || p.url, {
      message: '원문 링크가 필요합니다. arxivId, doi, url 중 하나는 반드시 있어야 합니다.',
      path: ['arxivId'],
    }),
});

/* ------------------------------------------------------------------ *
 * 개념 글 (src/content/essays/<slug>.md) — 수식 없는 교양 독자용
 * ------------------------------------------------------------------ */
const essays = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(300),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    audience: z.literal('general').default('general'),
    wikiRefs: z.array(wikiSlug).default([]),
    citations: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    status: status.default('draft'),
    author: z.string().default('Jun Lee'),
    aiAssisted,
  }),
});

export const collections = { tracks, modules, lessons, wiki, notes, papers, essays };
