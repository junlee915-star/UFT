import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

/* ------------------------------------------------------------------ *
 * base 경로
 * ------------------------------------------------------------------ */

/** 배포 base 경로(예: GitHub Pages 의 /UFT). 루트 배포면 빈 문자열. */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** 루트 절대 경로에 base 를 붙인다. 템플릿의 모든 내부 링크는 이 함수를 거친다. */
export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return BASE + path;
}

/**
 * 빌드 출력이 `format: 'file'` 이라 Astro.url.pathname 에 붙는 `.html` / `index.html` 을 떼어
 * 실제 공개 URL 경로로 되돌린다. canonical, og:url, 네비게이션 활성 판정에 쓴다.
 */
export function canonicalPath(pathname: string): string {
  const p = pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  return p === '' ? '/' : p;
}

/* ------------------------------------------------------------------ *
 * 표시 이름
 * ------------------------------------------------------------------ */
export type TrackId = 'physics' | 'philosophy' | 'synthesis';
export type Level = 'intro' | 'intermediate' | 'advanced';
export type Status = 'draft' | 'review' | 'verified';
export type AiAssisted = 'none' | 'outline' | 'draft' | 'translation';

export const levelLabel: Record<Level, string> = {
  intro: '입문',
  intermediate: '중급',
  advanced: '고급',
};

export const statusLabel: Record<Status, string> = {
  draft: '초안',
  review: '검토 중',
  verified: '검토 완료',
};

/** 검토 상태가 뜻하는 것. 배너와 소개 페이지에서 같은 문장을 쓴다. */
export const statusMeaning: Record<Status, string> = {
  draft: '작성 중이라 배포에서 제외됩니다.',
  review: '내용은 공개하되 출처 확인이 아직 끝나지 않았습니다. 유도와 인용을 직접 확인하고 읽으세요.',
  verified: '수식 유도와 출처를 다시 확인한 글입니다.',
};

export const aiAssistedLabel: Record<AiAssisted, string> = {
  none: 'AI 보조 없음',
  outline: '개요만 AI 보조',
  draft: '초고 AI 보조',
  translation: '번역 AI 보조',
};

export const trackLabel: Record<TrackId, string> = {
  physics: '물리학',
  philosophy: '종교·철학',
  synthesis: '통합',
};

/** 트랙별 색. CSS 변수로 내보내 카드와 배너에서 공통으로 쓴다. */
export const trackColorVar: Record<TrackId, string> = {
  physics: 'var(--track-physics)',
  philosophy: 'var(--track-philosophy)',
  synthesis: 'var(--track-synthesis)',
};

export const claimTypeLabel: Record<string, string> = {
  comparative: '대조',
  conceptual: '개념 분석',
  proposal: '제안',
};

/* ------------------------------------------------------------------ *
 * 경로
 * ------------------------------------------------------------------ */

/** 콘텐츠 본문이 쓰는 루트 기준 경로(역링크 탐색용, base 없음) */
export const paths = {
  track: (track: string) => `/learn/${track}`,
  module: (track: string, module: string) => `/learn/${track}/${module}`,
  lesson: (track: string, module: string, id: string) => `/learn/${track}/${module}/${id}`,
  wiki: (slug: string) => `/wiki/${slug}`,
  note: (id: string) => `/research/notes/${id}`,
  paper: (id: string) => `/research/papers/${id}`,
  essay: (id: string) => `/essays/${id}`,
  tag: (tag: string) => `/tags/${encodeURIComponent(tag)}`,
};

/** 템플릿에서 href 로 쓰는 경로(base 포함) */
export const urls = {
  home: () => withBase('/'),
  learn: () => withBase('/learn'),
  track: (track: string) => withBase(paths.track(track)),
  module: (track: string, module: string) => withBase(paths.module(track, module)),
  lesson: (track: string, module: string, id: string) => withBase(paths.lesson(track, module, id)),
  wiki: (slug: string) => withBase(paths.wiki(slug)),
  note: (id: string) => withBase(paths.note(id)),
  paper: (id: string) => withBase(paths.paper(id)),
  essay: (id: string) => withBase(paths.essay(id)),
  tag: (tag: string) => withBase(paths.tag(tag)),
  bib: () => withBase('/bib'),
  glossary: () => withBase('/glossary'),
  search: () => withBase('/search'),
  about: () => withBase('/about'),
};

/* ------------------------------------------------------------------ *
 * 컬렉션 조회
 * ------------------------------------------------------------------ */
type Lesson = CollectionEntry<'lessons'>;
type Wiki = CollectionEntry<'wiki'>;
type Note = CollectionEntry<'notes'>;
type Paper = CollectionEntry<'papers'>;
type Essay = CollectionEntry<'essays'>;

/** draft 는 프로덕션 빌드에서 제외한다. 개발 서버에서는 보인다. */
function published<T extends { data: { status?: Status } }>(entries: T[]): T[] {
  if (import.meta.env.DEV) return entries;
  return entries.filter((e) => e.data.status !== 'draft');
}

export async function getLessons(): Promise<Lesson[]> {
  return published(await getCollection('lessons')).sort((a, b) =>
    a.data.module.localeCompare(b.data.module) || a.data.order - b.data.order,
  );
}

export async function getWiki(): Promise<Wiki[]> {
  return published(await getCollection('wiki')).sort((a, b) => a.data.titleKo.localeCompare(b.data.titleKo, 'ko'));
}

export async function getNotes(): Promise<Note[]> {
  return published(await getCollection('notes')).sort(
    (a, b) => (b.data.updated ?? b.data.date).getTime() - (a.data.updated ?? a.data.date).getTime(),
  );
}

export async function getPapers(): Promise<Paper[]> {
  return published(await getCollection('papers')).sort((a, b) => b.data.year - a.data.year || a.data.titleKo.localeCompare(b.data.titleKo, 'ko'));
}

export async function getEssays(): Promise<Essay[]> {
  return published(await getCollection('essays')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getModules() {
  return (await getCollection('modules')).sort((a, b) => a.data.track.localeCompare(b.data.track) || a.data.order - b.data.order);
}

export async function getTracks() {
  return (await getCollection('tracks')).sort((a, b) => a.data.order - b.data.order);
}

/** 단원 id 로 빠르게 찾기 위한 색인. 선수·근거 배너가 매번 쓴다. */
export async function getLessonIndex(): Promise<Map<string, Lesson>> {
  return new Map((await getLessons()).map((l) => [l.id, l]));
}

/** 단원 하나의 공개 URL */
export function lessonUrl(l: Lesson): string {
  return urls.lesson(l.data.track, l.data.module, l.id);
}
export function lessonPath(l: Lesson): string {
  return paths.lesson(l.data.track, l.data.module, l.id);
}

/* ------------------------------------------------------------------ *
 * 공통 유틸
 * ------------------------------------------------------------------ */
export function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(d);
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** 여러 종류의 글을 한 목록에 섞을 때 쓰는 공통 형태 */
export type Listing = {
  kind: '단원' | '위키' | '연구 노트' | '논문 요약' | '개념 글';
  url: string;
  path: string;
  title: string;
  summary: string;
  date: Date;
  tags: string[];
  track?: TrackId;
  level?: Level;
  status: Status;
  body: string;
};

export function listLessons(ls: Lesson[]): Listing[] {
  return ls.map((l) => ({
    kind: '단원' as const,
    url: lessonUrl(l),
    path: lessonPath(l),
    title: `${l.id.toUpperCase()} · ${l.data.title}`,
    summary: l.data.summary,
    date: l.data.updated ?? l.data.created,
    tags: l.data.tags,
    track: l.data.track,
    level: l.data.level,
    status: l.data.status,
    body: l.body ?? '',
  }));
}

export function listWiki(ws: Wiki[]): Listing[] {
  return ws.map((w) => ({
    kind: '위키' as const,
    url: urls.wiki(w.id),
    path: paths.wiki(w.id),
    title: w.data.titleKo,
    summary: w.data.summary,
    date: w.data.updated ?? w.data.created,
    tags: w.data.tags,
    level: w.data.level,
    status: w.data.status,
    body: w.body ?? '',
  }));
}

export function listNotes(ns: Note[]): Listing[] {
  return ns.map((n) => ({
    kind: '연구 노트' as const,
    url: urls.note(n.id),
    path: paths.note(n.id),
    title: n.data.title,
    summary: n.data.summary,
    date: n.data.updated ?? n.data.date,
    tags: n.data.tags,
    status: n.data.status,
    body: n.body ?? '',
  }));
}

export function listPapers(ps: Paper[]): Listing[] {
  return ps.map((p) => ({
    kind: '논문 요약' as const,
    url: urls.paper(p.id),
    path: paths.paper(p.id),
    title: p.data.titleKo,
    summary: p.data.summaryKo,
    date: p.data.updated ?? p.data.created,
    tags: p.data.tags,
    status: p.data.status,
    body: p.body ?? '',
  }));
}

export function listEssays(es: Essay[]): Listing[] {
  return es.map((e) => ({
    kind: '개념 글' as const,
    url: urls.essay(e.id),
    path: paths.essay(e.id),
    title: e.data.title,
    summary: e.data.summary,
    date: e.data.updated ?? e.data.date,
    tags: e.data.tags,
    status: e.data.status,
    body: e.body ?? '',
  }));
}

/** 사이트의 모든 글을 한 배열로 */
export async function getAllListings(): Promise<Listing[]> {
  const [lessons, wiki, notes, papers, essays] = await Promise.all([
    getLessons(),
    getWiki(),
    getNotes(),
    getPapers(),
    getEssays(),
  ]);
  return [...listLessons(lessons), ...listWiki(wiki), ...listNotes(notes), ...listPapers(papers), ...listEssays(essays)];
}

/** 본문에서 특정 경로로 링크하는 글 목록 → 역링크 */
export function findBacklinks(all: Listing[], targetPath: string, selfPath?: string): Listing[] {
  const re = new RegExp(`\\]\\(${targetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:[#)?"'])`);
  return all.filter((e) => e.path !== selfPath && re.test(e.body));
}

/** 태그 → 개수, 많은 순 */
export function collectTags(all: Listing[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const e of all) for (const t of e.tags) m.set(t, (m.get(t) ?? 0) + 1);
  return new Map([...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko')));
}

export { getEntry };
