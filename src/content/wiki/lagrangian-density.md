---
titleKo: 라그랑지안 밀도
titleEn: Lagrangian density
summary: 장이론에서 작용을 시공간 적분으로 나타낼 때의 피적분 함수. 장과 그 1차 미분의 국소 함수이며 로렌츠 스칼라다.
aliases: [라그랑지언 밀도]
tracks: [physics]
related: [noether-current, yang-mills-action]
citations: [peskin1995, weinberg1995]
level: intro
status: verified
tags: [라그랑지안, 작용]
created: 2026-09-18
updated: 2026-09-18
aiAssisted: draft
---

## 정의

$$
S = \int \dd^4x\; \lag(\phi_i, \partial_\mu\phi_i), \qquad L = \int \dd^3x\; \lag
$$

## 요구 조건

1. **국소성**: 한 점의 장과 유한 차수 미분만 포함.
2. **로렌츠 불변성**: $\lag$는 스칼라.
3. **실수성**: 해밀토니안이 에르미트가 되도록 $\lag^* = \lag$.
4. **재규격화 가능성**(양자론): 4차원에서 질량 차원이 4 이하인 항만 허용. $[\phi] = 1$, $[\psi] = \tfrac32$, $[A_\mu] = 1$.

## 자주 쓰는 예

| 장 | $\lag$ |
| --- | --- |
| 실수 스칼라 | $\tfrac12(\partial\phi)^2 - \tfrac12 m^2\phi^2 - \tfrac{\lambda}{4!}\phi^4$ |
| 디랙 | $\bar\psi(i\gamma^\mu\partial_\mu - m)\psi$ |
| 맥스웰 | $-\tfrac14 F_{\mu\nu}F^{\mu\nu}$ |
| 양-밀스 | $-\tfrac12\tr(F_{\mu\nu}F^{\mu\nu})$ |
| 아인슈타인-힐베르트 | $\dfrac{1}{16\pi G}\sqrt{-g}\,R$ |

## 학습 트랙에서

- [라그랑지안 장이론과 오일러-라그랑주 방정식](/learn/physics/a1/a1-1)
