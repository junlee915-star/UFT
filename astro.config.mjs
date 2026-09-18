// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkEquations } from './src/lib/remark-equations.mjs';
import { remarkCite } from './src/lib/remark-cite.mjs';
import { rehypeBaseLinks } from './src/lib/rehype-base-links.mjs';

const site = process.env.SITE_URL ?? 'https://uft.example.com';
// 하위 경로 배포(GitHub Pages 프로젝트 사이트 등)는 BASE_PATH=/UFT 처럼 지정한다. 기본은 루트.
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'never',
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkEquations, [remarkCite, { bibPath: './src/data/references.bib' }]],
      rehypePlugins: [
        [rehypeBaseLinks, { base }],
        [
          rehypeKatex,
          {
            strict: 'ignore',
            trust: true,
            macros: {
              '\\dd': '\\mathrm{d}',
              '\\lag': '\\mathcal{L}',
              '\\tr': '\\operatorname{tr}',
            },
          },
        ],
      ],
      smartypants: false,
    }),
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
  vite: { plugins: [tailwindcss()] },
});
