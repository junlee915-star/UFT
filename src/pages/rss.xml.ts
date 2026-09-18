import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getNotes, getPapers, getEssays, getLessons, urls, lessonUrl } from '@/lib/content';

export async function GET(context: APIContext) {
  const [notes, papers, essays, lessons] = await Promise.all([getNotes(), getPapers(), getEssays(), getLessons()]);

  const items = [
    ...notes.map((n) => ({
      title: `[연구 노트] ${n.data.title}`,
      description: n.data.summary,
      pubDate: n.data.updated ?? n.data.date,
      link: urls.note(n.id),
      categories: n.data.tags,
    })),
    ...papers.map((p) => ({
      title: `[논문 요약] ${p.data.titleKo}`,
      description: p.data.summaryKo,
      pubDate: p.data.updated ?? p.data.created,
      link: urls.paper(p.id),
      categories: p.data.tags,
    })),
    ...essays.map((e) => ({
      title: `[개념 글] ${e.data.title}`,
      description: e.data.summary,
      pubDate: e.data.updated ?? e.data.date,
      link: urls.essay(e.id),
      categories: e.data.tags,
    })),
    ...lessons.map((l) => ({
      title: `[단원 ${l.id.toUpperCase()}] ${l.data.title}`,
      description: l.data.summary,
      pubDate: l.data.updated ?? l.data.created,
      link: lessonUrl(l),
      categories: l.data.tags,
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: '통일장이론 교육과정',
    description: '새 단원, 연구 노트, 논문 요약, 개념 글',
    site: context.site ?? 'https://uft-study.pages.dev',
    items,
    trailingSlash: false,
    customData: '<language>ko-kr</language>',
  });
}
