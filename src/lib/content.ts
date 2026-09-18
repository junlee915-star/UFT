import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';

type Dated = { data: { created: Date; updated?: Date; draft?: boolean } };

/** 초안(draft)은 프로덕션 빌드에서 제외한다. */
export function isPublished<T extends Dated>(entry: T): boolean {
  return import.meta.env.DEV || !entry.data.draft;
}

export async function getPublished<C extends CollectionKey>(collection: C): Promise<CollectionEntry<C>[]> {
  const all = await getCollection(collection);
  return (all as CollectionEntry<C>[]).filter((e) => isPublished(e as unknown as Dated));
}

export function byNewest<T extends Dated>(a: T, b: T): number {
  return (b.data.updated ?? b.data.created).getTime() - (a.data.updated ?? a.data.created).getTime();
}

export function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export const urls = {
  unit: (id: string) => `/learn/${id}`,
  module: (id: string) => `/learn/${id}`,
  note: (id: string) => `/research/notes/${id}`,
  paper: (id: string) => `/research/papers/${id}`,
  wiki: (id: string) => `/wiki/${id}`,
  tag: (tag: string) => `/tags/${encodeURIComponent(tag)}`,
};

export type AnyEntry =
  | CollectionEntry<'learn'>
  | CollectionEntry<'notes'>
  | CollectionEntry<'papers'>
  | CollectionEntry<'wiki'>;

export function urlOf(entry: AnyEntry): string {
  switch (entry.collection) {
    case 'learn':
      return urls.unit(entry.id);
    case 'notes':
      return urls.note(entry.id);
    case 'papers':
      return urls.paper(entry.id);
    case 'wiki':
      return urls.wiki(entry.id);
  }
}

export const collectionLabel: Record<AnyEntry['collection'], string> = {
  learn: '학습',
  notes: '연구 노트',
  papers: '논문 요약',
  wiki: '위키',
};

/** 발행된 모든 글(모듈 메타 제외) */
export async function getAllArticles(): Promise<AnyEntry[]> {
  const [learn, notes, papers, wiki] = await Promise.all([
    getPublished('learn'),
    getPublished('notes'),
    getPublished('papers'),
    getPublished('wiki'),
  ]);
  return [...learn, ...notes, ...papers, ...wiki];
}

/** 본문에서 특정 경로(예: /wiki/gauge-symmetry)로 링크하는 글 목록 → 역링크 */
export function findBacklinks(all: AnyEntry[], targetPath: string, self?: AnyEntry): AnyEntry[] {
  const re = new RegExp(`\\]\\(${targetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:[#)?])`);
  return all.filter((e) => e !== self && (e.body ?? '').match(re));
}

/** 태그 → 개수 */
export function collectTags(all: AnyEntry[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const e of all) for (const t of e.data.tags) m.set(t, (m.get(t) ?? 0) + 1);
  return new Map([...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko')));
}
