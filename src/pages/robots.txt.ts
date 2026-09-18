import type { APIContext } from 'astro';
import { withBase } from '@/lib/content';

/** robots.txt 를 배포 도메인(SITE_URL)과 base 경로에 맞춰 생성한다. */
export function GET({ site, url }: APIContext) {
  const origin = site ?? new URL(url.origin);
  const sitemap = new URL(withBase('/sitemap-index.xml'), origin).href;
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
