---
titleKo: 작용 원리
titleEn: Action principle
summary: 계의 실제 경로는 작용 범함수를 정류점으로 만드는 경로라는 원리. 운동방정식을 대칭에서 곧바로 읽어낼 수 있게 해 준다.
aliases: [최소작용의 원리, 해밀턴 원리, 변분 원리]
tracks: [physics, synthesis]
related: [lagrangian-density, noether-current, path-integral, yang-mills-action]
citations: [goldstein2002, peskin1995, carroll2004]
level: intermediate
status: verified
tags: [작용, 변분법, 대칭]
created: 2026-09-19
aiAssisted: draft
---

## 정의

작용 $S$ 는 경로 또는 장 배위 하나에 수 하나를 대응시키는 범함수다. 장론에서는 [라그랑지안 밀도](/wiki/lagrangian-density) $\lag$ 의 시공간 적분으로 쓴다.

$$
S[\phi] = \int \dd^4x\; \lag(\phi,\,\partial_\mu\phi)
$$

경계에서 $\delta\phi = 0$ 인 임의의 변분에 대해 $\delta S = 0$ 이 되는 배위가 물리적 배위다.

## 오일러-라그랑주 방정식

변분을 전개하고 부분적분하면

$$
\partial_\mu\!\left(\frac{\partial\lag}{\partial(\partial_\mu\phi)}\right) - \frac{\partial\lag}{\partial\phi} = 0.
$$

부분적분에서 나온 표면항 $\partial_\mu\!\left(\frac{\partial\lag}{\partial(\partial_\mu\phi)}\delta\phi\right)$ 이 경계조건으로 사라진다는 가정이 들어간다. 이 가정이 깨지는 경우(예를 들어 일반상대론의 깁스-요크-호킹 항)에는 작용에 경계항을 따로 더해야 한다 [@carroll2004].

## 왜 방정식이 아니라 작용에서 출발하는가

| 이유 | 내용 |
| --- | --- |
| 대칭의 부과 | 로런츠 불변성과 [게이지 대칭](/wiki/gauge-symmetry)을 $\lag$ 한 줄에 직접 요구할 수 있다 |
| 보존량 | 연속대칭이 곧바로 [뇌터 흐름](/wiki/noether-current)을 준다 |
| 양자화 | [경로적분](/wiki/path-integral)의 가중치가 $e^{iS/\hbar}$ 이다 |
| 항의 열거 | 주어진 대칭과 차원에서 쓸 수 있는 항을 남김없이 셀 수 있다 |

## "최소"가 아니다

이름과 달리 요구되는 것은 극소가 아니라 정류점이다. 실제로 자유입자의 긴 경로나 중력장 속 경로에서 작용은 안장점이 되기도 한다 [@goldstein2002]. 또한 작용 원리가 "자연이 목적을 향해 경로를 고른다"는 목적론적 주장으로 읽히기 쉬우나, 오일러-라그랑주 방정식은 각 점에서의 국소 미분방정식과 논리적으로 동치다. 전역적 서술과 국소적 서술이 같은 내용이라는 사실이 목적론적 해석을 불필요하게 만든다.
