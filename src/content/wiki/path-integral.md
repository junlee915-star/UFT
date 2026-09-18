---
titleKo: 경로적분
titleEn: Path integral
summary: 가능한 모든 장 배위에 $e^{iS/\hbar}$ 를 가중치로 주어 더하는 양자화 방법. 작용 원리가 왜 성립하는지에 대한 양자적 설명이기도 하다.
aliases: [파인만 경로적분, 범함수 적분]
tracks: [physics]
related: [action-principle, lagrangian-density, renormalization-group, effective-field-theory]
citations: [zee2010, srednicki2007, peskin1995]
level: advanced
status: verified
tags: [양자화, 작용, 생성범함수]
created: 2026-09-19
aiAssisted: draft
---

## 정의

두 장 배위 사이의 전이진폭을 모든 중간 경로에 대한 합으로 쓴다.

$$
\langle \phi_f,\,t_f \mid \phi_i,\,t_i \rangle
= \int \mathcal D\phi\; e^{\,iS[\phi]/\hbar}
$$

실용적으로는 원천 $J$ 를 붙인 생성범함수를 쓴다.

$$
Z[J] = \int \mathcal D\phi\; \exp\!\left( \frac{i}{\hbar}\Big( S[\phi] + \int \dd^4x\, J\phi \Big) \right)
$$

상관함수는 $J$ 에 대한 범함수 미분으로 얻는다. $\langle 0 | T\phi(x)\phi(y) | 0\rangle = (-i)^2 \delta^2 \ln Z / \delta J(x)\delta J(y)$ 꼴이다 [@srednicki2007].

## 고전 극한

$\hbar \to 0$ 이면 위상 $S/\hbar$ 이 급격히 진동해 대부분의 경로가 서로 상쇄되고, 위상이 정류인 경로 $\delta S = 0$ 근방만 살아남는다. 즉 [작용 원리](/wiki/action-principle)는 공리가 아니라 정류위상근사의 결과다. 이것이 정준양자화 대신 경로적분을 택했을 때 얻는 개념적 이득이다 [@zee2010].

## 왜 장론에서 이 방법을 쓰는가

| 장점 | 내용 |
| --- | --- |
| 명시적 불변성 | 로런츠·게이지 대칭이 적분 전 과정에서 눈에 보인다 |
| 통계역학과의 대응 | $t \to -i\tau$ 로 돌리면 $e^{-S_E}$ 가 되어 분배함수와 같은 꼴이 된다 |
| 비섭동 계산 | 인스탄톤과 격자 계산이 자연스럽게 정식화된다 |
| 척도 분리 | 고에너지 모드만 적분해 없애는 조작을 정의할 수 있다 |

두 번째 줄이 [재규격화군](/wiki/renormalization-group)이 입자물리와 상전이 이론에서 같은 언어로 쓰이는 이유다.

## 주의

게이지 이론에서는 게이지 변환으로 연결된 배위들이 모두 같은 물리 상태이므로 적분이 무한한 중복을 센다. 파데예프-포포프 절차로 게이지 궤도의 부피를 떼어내야 하고, 이때 고스트 장이 등장한다 [@peskin1995]. 또 $\mathcal D\phi$ 는 수학적으로 잘 정의된 측도가 아니며, 유클리드 격자 위에서만 엄밀한 의미가 주어진다.
