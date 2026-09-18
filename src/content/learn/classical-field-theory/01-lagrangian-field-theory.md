---
title: 라그랑지안 장이론과 오일러-라그랑주 방정식
summary: 입자의 라그랑지안을 장의 라그랑지안 밀도로 일반화하고, 최소 작용 원리에서 장 방정식을 유도합니다.
module: classical-field-theory
order: 1
difficulty: 입문
status: 검토 완료
tags: [라그랑지안, 작용, 클라인-고든]
created: 2026-09-18
estimatedMinutes: 40
---

## 동기

뉴턴 역학은 입자의 위치 $q_i(t)$를 추적합니다. 반면 전자기학이나 중력에서는 시공간의 **모든 점**에 값이 있는 양, 즉 [장](/wiki/lagrangian-density)을 다뤄야 합니다. 입자 역학의 라그랑지안 형식은 장으로 자연스럽게 확장되고, 이 확장이 이후 모든 통일 시도의 공통 언어가 됩니다.

## 핵심 수식

입자의 작용 $S = \int L(q, \dot q)\,\dd t$를 장 $\phi(x)$에 대해 다음과 같이 일반화합니다.

$$
S[\phi] = \int \dd^4x\; \lag\big(\phi, \partial_\mu \phi\big) \label{action}
$$

$\lag$는 [라그랑지안 밀도](/wiki/lagrangian-density)이며, $\delta S = 0$ 조건에서 장의 오일러-라그랑주 방정식이 나옵니다.

$$
\partial_\mu \left( \frac{\partial \lag}{\partial(\partial_\mu \phi)} \right) - \frac{\partial \lag}{\partial \phi} = 0 \label{el}
$$

## 유도

작용 @eq:action 에서 장을 $\phi \to \phi + \delta\phi$로 변화시키면

$$
\delta S = \int \dd^4x \left[ \frac{\partial \lag}{\partial \phi}\,\delta\phi + \frac{\partial \lag}{\partial(\partial_\mu\phi)}\,\partial_\mu(\delta\phi) \right]. \notag
$$

두 번째 항을 부분적분하고, 경계에서 $\delta\phi = 0$이라는 조건으로 표면항을 버리면

$$
\delta S = \int \dd^4x \left[ \frac{\partial \lag}{\partial \phi} - \partial_\mu\frac{\partial \lag}{\partial(\partial_\mu\phi)} \right]\delta\phi .
$$

임의의 $\delta\phi$에 대해 $\delta S = 0$이려면 괄호 안이 사라져야 하므로 @eq:el 을 얻습니다.

## 예제: 클라인-고든 장

실수 스칼라 장의 가장 단순한 로렌츠 불변 라그랑지안은

$$
\lag = \tfrac12 \partial_\mu\phi\,\partial^\mu\phi - \tfrac12 m^2\phi^2 . \label{kg-lag}
$$

@eq:el 에 대입하면 $\partial\lag/\partial\phi = -m^2\phi$, $\partial\lag/\partial(\partial_\mu\phi) = \partial^\mu\phi$이므로

$$
(\partial_\mu\partial^\mu + m^2)\,\phi = 0 ,
$$

즉 클라인-고든 방정식입니다. 평면파 해 $\phi \propto e^{-ik\cdot x}$를 넣으면 $k^2 = m^2$, 상대론적 에너지-운동량 관계 $E^2 = \mathbf p^2 + m^2$가 나옵니다. 부호 규약은 $\eta = \operatorname{diag}(+,-,-,-)$입니다 [@peskin1995].

## 연습문제

1. 복소 스칼라 장 $\lag = \partial_\mu\phi^*\partial^\mu\phi - m^2\phi^*\phi$에 대해 $\phi$와 $\phi^*$를 독립 변수로 보고 장 방정식을 구하시오.

<details>
<summary>해설</summary>

$\phi^*$에 대한 변분: $\partial\lag/\partial\phi^* = -m^2\phi$, $\partial\lag/\partial(\partial_\mu\phi^*) = \partial^\mu\phi$. 따라서 $(\Box + m^2)\phi = 0$. $\phi$에 대한 변분은 그 복소공액을 준다.

</details>

2. 라그랑지안 밀도에 전체 미분 $\partial_\mu K^\mu(\phi)$를 더해도 장 방정식이 바뀌지 않음을 보이시오.

<details>
<summary>해설</summary>

작용에 $\int \dd^4x\,\partial_\mu K^\mu = \oint \dd\Sigma_\mu K^\mu$가 더해지는데 이는 경계값에만 의존한다. 변분에서 경계는 고정되므로 $\delta S$에 기여하지 않는다.

</details>

## 더 읽기

- Peskin & Schroeder 2장 [@peskin1995]
- Weinberg 7장은 해밀토니안 형식과의 관계를 다룬다 [@weinberg1995]
