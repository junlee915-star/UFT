import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublished, byNewest, urls } from '@/lib/content';

export async function GET(context: APIContext) {
  const notes = await getPublished('notes');
  const papers = await getPublished('papers');
  const items = [
    ...notes.map((n) => ({ title: `[연구 노트] ${n.data.title}`, description: n.data.summary, pubDate: n.data.updated ?? n.data.created, link: urls.note(n.id), categories: n.data.tags, data: n.data })),
    ...papers.map((p) => ({ title: `[논문 요약] ${p.data.title}`, description: p.data.summary, pubDate: p.data.updated ?? p.data.created, link: urls.paper(p.id), categories: p.data.tags, data: p.data })),
  ]
    .sort(byNewest)
    .map(({ data: _d, ...rest }) => rest);
  return rss({
    title: '통일장이론 연구·학습',
    description: '연구 노트와 논문 요약 신기사',
    site: context.site ?? 'https://uft.example.com',
    items,
    trailingSlash: false,
    customData: '<language>ko-kr</language>',
  });
}
