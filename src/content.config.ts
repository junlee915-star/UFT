import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const difficulty = z.enum(['입문', '중급', '고급']);
const status = z.enum(['초안', '검토 중', '검토 완료']).default('초안');

const common = {
  title: z.string(),
  summary: z.string().max(300),
  tags: z.array(z.string()).default([]),
  difficulty: difficulty.default('중급'),
  status,
  author: z.string().default('운영자'),
  created: z.coerce.date(),
  updated: z.coerce.date().optional(),
  draft: z.boolean().default(false),
};

/** 학습 모듈 메타데이터 (src/content/modules/*.yaml) */
const modules = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/modules' }),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    summary: z.string(),
    prerequisites: z.array(z.string()).default([]),
    difficulty,
  }),
});

/** 학습 단원 (src/content/learn/<module>/<unit>.md|mdx) → id = "<module>/<unit>" */
const learn = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/learn',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    ...common,
    module: z.string(),
    order: z.number().int(),
    prerequisites: z.array(z.string()).default([]), // 단원 id 목록
    estimatedMinutes: z.number().int().positive().optional(),
  }),
});

/** 연구 노트 */
const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({ ...common }),
});

/** 논문 요약 */
const papers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/papers' }),
  schema: z
    .object({
      ...common,
      titleEn: z.string(),
      authors: z.array(z.string()).min(1),
      year: z.number().int(),
      venue: z.string().optional(),
      arxiv: z.string().optional(),
      doi: z.string().optional(),
      url: z.url().optional(),
      bibKey: z.string().optional(),
    })
    .refine((p) => p.arxiv || p.doi || p.url, { message: '원문 링크(arxiv, doi, url 중 하나)는 필수입니다.' }),
});

/** 수식 위키 */
const wiki = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/wiki' }),
  schema: z.object({
    ...common,
    titleEn: z.string().optional(),
    aliases: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]), // wiki id 목록
  }),
});

export const collections = { modules, learn, notes, papers, wiki };
