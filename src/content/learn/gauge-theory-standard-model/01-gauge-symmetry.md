---
title: 게이지 대칭과 공변 미분
summary: 전역 U(1) 대칭을 국소 대칭으로 승격하면 게이지 장이 반드시 등장함을 보이고, 비아벨 군으로 일반화합니다.
module: gauge-theory-standard-model
order: 1
prerequisites: [classical-field-theory/02-noether-theorem, classical-field-theory/03-maxwell-covariant]
difficulty: 중급
status: 검토 완료
tags: [게이지 대칭, 공변 미분, U(1), SU(N)]
created: 2026-09-18
estimatedMinutes: 60
---

## 동기

모듈 1에서 복소 스칼라 장의 전역 위상 변환 $\phi \to e^{i\alpha}\phi$가 보존 전하를 준다는 것을 보았습니다. 이제 $\alpha$가 시공간마다 다를 수 있다고 **요구**해 봅시다. 이 요구만으로 전자기장이 존재해야 한다는 결론이 나옵니다.

## 핵심 수식

국소 변환 $\phi(x) \to e^{i\alpha(x)}\phi(x)$ 아래에서 $\partial_\mu\phi$는 공변적으로 변하지 않습니다. 대신 [공변 미분](/wiki/covariant-derivative)을 정의합니다.

$$
D_\mu\phi = \big(\partial_\mu + i e A_\mu\big)\phi, \qquad A_\mu \to A_\mu - \tfrac1e\,\partial_\mu\alpha . \label{dmu-u1}
$$

그러면 $D_\mu\phi \to e^{i\alpha}D_\mu\phi$가 되어, $\partial_\mu \to D_\mu$로 바꾼 라그랑지안은 국소 대칭을 갖습니다.

비아벨 군 $G$의 표현 $T^a$에 대해서는

$$
D_\mu = \partial_\mu - i g A_\mu^a T^a, \qquad
F^a_{\mu\nu} = \partial_\mu A^a_\nu - \partial_\nu A^a_\mu + g f^{abc}A^b_\mu A^c_\nu . \label{dmu-nonabelian}
$$

$f^{abc}$는 $[T^a, T^b] = i f^{abc}T^c$로 정의되는 구조상수입니다.

## 유도: 왜 게이지 장이 필요한가

$\partial_\mu(e^{i\alpha}\phi) = e^{i\alpha}(\partial_\mu\phi + i\,\partial_\mu\alpha\,\phi)$이므로 여분의 항 $i\,\partial_\mu\alpha\,\phi$가 생깁니다. 이 항을 상쇄하려면 $\partial_\mu\alpha$처럼 변하는 새로운 장이 있어야 하고, 그것이 $A_\mu$입니다. @eq:dmu-u1 의 변환 규칙은 정확히 맥스웰 이론의 게이지 변환 $A_\mu \to A_\mu + \partial_\mu\chi$($\chi = -\alpha/e$)입니다. 즉 **국소 위상 불변성을 요구하는 것과 전자기장을 도입하는 것은 동치**입니다.

## 비아벨 일반화

장 $\psi$가 $G$의 어떤 표현으로 변환한다고 하자: $\psi \to U(x)\psi$, $U = e^{i\alpha^a(x)T^a}$. 공변 미분이 $D_\mu\psi \to U D_\mu\psi$를 만족하려면 게이지 장은

$$
A_\mu \to U A_\mu U^{-1} - \tfrac{i}{g}\,(\partial_\mu U)U^{-1}, \qquad A_\mu \equiv A^a_\mu T^a
$$

로 변해야 합니다. 두 번째 항은 U(1)과 같지만, 첫 번째 항 때문에 $A_\mu$ 자체가 딸림표현(adjoint)으로 회전합니다. 장세기는 $[D_\mu, D_\nu] = -ig F_{\mu\nu}$로 정의되며 계산하면 @eq:dmu-nonabelian 의 두 번째 식이 나옵니다. 마지막 항 $g f^{abc}A^bA^c$ 때문에 게이지 장은 스스로와 상호작용하며, 이것이 [양-밀스 작용](/wiki/yang-mills-action)의 비선형성입니다.

## 예제: SU(2)

$T^a = \sigma^a/2$, $f^{abc} = \epsilon^{abc}$. 게이지 장은 세 개($W^1, W^2, W^3$)이고, 장세기의 비선형 항은 $g\,\epsilon^{abc}W^b_\mu W^c_\nu$입니다. 양과 밀스는 1954년 아이소스핀을 국소 대칭으로 승격하여 이 구조에 도달했습니다 [@yang1954]. 이 논문의 [요약](/research/papers/yang-mills-1954)을 함께 읽어 보세요.

## 연습문제

1. @eq:dmu-nonabelian 에서 $[D_\mu, D_\nu]\psi = -ig F_{\mu\nu}\psi$를 직접 계산하여 장세기의 비선형 항을 얻으시오.
2. U(1)에서 $f^{abc} = 0$이므로 광자는 스스로 상호작용하지 않음을 확인하시오.

## 더 읽기

- Peskin & Schroeder 15장 [@peskin1995]
- Zee, 군론 IV.5 [@zee2016]
