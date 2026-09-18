---
title: 네터 정리와 보존류
summary: 연속 대칭 하나마다 보존되는 흐름(current)이 하나씩 대응한다는 네터 정리를 장이론에서 증명하고, 에너지-운동량 텐서와 U(1) 전하를 예로 봅니다.
module: classical-field-theory
order: 2
prerequisites: [classical-field-theory/01-lagrangian-field-theory]
difficulty: 입문
status: 검토 완료
tags: [네터 정리, 대칭, 보존류]
created: 2026-09-18
estimatedMinutes: 45
---

## 동기

통일장이론의 전략은 한 문장으로 요약됩니다. **더 큰 대칭을 요구하면 상호작용이 결정된다.** 그 출발점이 되는 것이 대칭과 보존량을 잇는 네터 정리입니다 [@noether1918].

## 핵심 수식

장의 무한소 변환 $\phi \to \phi + \epsilon\,\Delta\phi$ 아래에서 라그랑지안이 전체 미분만큼만 바뀐다고 하자. 즉 $\lag \to \lag + \epsilon\,\partial_\mu \mathcal J^\mu$. 그러면 다음 [네터 흐름](/wiki/noether-current)이 보존된다.

$$
j^\mu = \frac{\partial\lag}{\partial(\partial_\mu\phi)}\,\Delta\phi - \mathcal J^\mu, \qquad \partial_\mu j^\mu = 0 . \label{noether}
$$

## 유도

라그랑지안의 변화를 직접 계산하면

$$
\epsilon\,\partial_\mu\mathcal J^\mu = \delta\lag = \frac{\partial\lag}{\partial\phi}\,\epsilon\Delta\phi + \frac{\partial\lag}{\partial(\partial_\mu\phi)}\,\epsilon\,\partial_\mu\Delta\phi . \notag
$$

우변 첫 항에 오일러-라그랑주 방정식 $\partial\lag/\partial\phi = \partial_\mu\big(\partial\lag/\partial(\partial_\mu\phi)\big)$을 넣고 정리하면

$$
\partial_\mu\left[\frac{\partial\lag}{\partial(\partial_\mu\phi)}\,\Delta\phi\right] = \partial_\mu \mathcal J^\mu ,
$$

이므로 @eq:noether 의 $j^\mu$는 $\partial_\mu j^\mu = 0$을 만족한다. 보존 전하는 $Q = \int \dd^3x\, j^0$이며 $\dd Q/\dd t = 0$이다.

## 예제 1: 시공간 평행이동과 에너지-운동량 텐서

$x^\mu \to x^\mu + a^\mu$ 아래에서 $\Delta\phi = -a^\nu\partial_\nu\phi$, $\mathcal J^\mu = -a^\mu \lag$. 네 개의 보존류를 한데 모으면

$$
T^{\mu}{}_{\nu} = \frac{\partial\lag}{\partial(\partial_\mu\phi)}\,\partial_\nu\phi - \delta^\mu_\nu\,\lag , \label{emt}
$$

$T^{00}$은 해밀토니안 밀도, $T^{0i}$는 운동량 밀도다. 클라인-고든 장에 대해 $T^{00} = \tfrac12\dot\phi^2 + \tfrac12(\nabla\phi)^2 + \tfrac12 m^2\phi^2$로 양의 정부호다.

## 예제 2: 전역 U(1) 위상 변환

복소 스칼라 장에 $\phi \to e^{i\alpha}\phi$를 가하면 $\Delta\phi = i\phi$, $\Delta\phi^* = -i\phi^*$, $\mathcal J^\mu = 0$. 보존류는

$$
j^\mu = i\left(\phi^*\partial^\mu\phi - \phi\,\partial^\mu\phi^*\right)
$$

로, 이 전하가 뒤에서 전자기 결합의 원천이 됩니다. 위상 $\alpha$를 시공간의 함수로 승격하는 것이 [게이지 대칭](/wiki/gauge-symmetry)의 아이디어입니다.

## 연습문제

1. @eq:emt 이 대칭 텐서가 아닐 수 있음을 확인하고, 벨린판테(Belinfante) 개선이 필요한 이유를 한 문장으로 설명하시오.

<details>
<summary>해설</summary>

$T^{\mu\nu}$의 정의에는 $\partial^\nu\phi$가 들어가 지표 순서가 비대칭이다. 스칼라 장에서는 우연히 대칭이지만, 벡터·스피너 장에서는 스핀 각운동량의 기여가 있어 $\partial_\lambda B^{\lambda\mu\nu}$($B$는 앞 두 지표에 반대칭) 항을 더해 대칭화해야 중력과 결합할 수 있다.

</details>

## 더 읽기

- Weinberg 7.3절 [@weinberg1995]
- Schwartz 3장 [@schwartz2014]
