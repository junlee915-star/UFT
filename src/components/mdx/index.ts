/**
 * MDX 본문에서 import 없이 쓰는 전용 컴포넌트.
 * 단원 레이아웃이 <Content components={mdxComponents} /> 로 넘겨준다.
 */
import Gist from './Gist.astro';
import Source from './Source.astro';
import Problem from './Problem.astro';
import Solution from './Solution.astro';
import Claims from './Claims.astro';
import Prereq from './Prereq.astro';
import Grounds from './Grounds.astro';

export const mdxComponents = { Gist, Source, Problem, Solution, Claims, Prereq, Grounds };
export { Gist, Source, Problem, Solution, Claims, Prereq, Grounds };
