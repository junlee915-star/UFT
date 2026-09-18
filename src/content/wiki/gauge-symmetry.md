---
title: 게이지 대칭
titleEn: Gauge symmetry
summary: 시공간의 각 점에서 독립적으로 적용할 수 있는 국소 대칭. 이 대칭을 요구하면 상호작용을 매개하는 게이지 장이 필연적으로 등장한다.
aliases: [국소 대칭, 게이지 불변성]
related: [covariant-derivative, field-strength, yang-mills-action]
difficulty: 중급
status: 검토 완료
tags: [게이지 대칭, 대칭]
created: 2026-09-18
---

## 정의

장 $\psi(x)$가 리 군 $G$의 표현으로 변환할 때, 변환 매개변수가 시공간의 함수 $U(x) = e^{i\alpha^a(x)T^a}$인 대칭을 **게이지 대칭**이라 한다. 매개변수가 상수인 경우는 전역(global) 대칭이라 구분한다.

## 핵심 수식

$$
\psi \to U(x)\,\psi, \qquad A_\mu \to U A_\mu U^{-1} - \frac{i}{g}(\partial_\mu U)U^{-1}
$$

미분 $\partial_\mu\psi$는 공변적으로 변환하지 않으므로 [공변 미분](/wiki/covariant-derivative) $D_\mu$로 대체해야 하며, 이 과정에서 게이지 장 $A_\mu$가 도입된다. 게이지 장 자체의 운동은 [장세기 텐서](/wiki/field-strength)로 기술된다.

## 물리적 의미

- 게이지 대칭은 "진짜" 대칭이 아니라 기술의 **중복성**(redundancy)이다. 게이지 변환으로 연결된 두 배위는 같은 물리 상태다.
- 게이지 불변성은 게이지 보손의 질량항 $m^2 A_\mu A^\mu$을 금지한다. 질량은 [자발 대칭 깨짐](/wiki/spontaneous-symmetry-breaking)으로만 생길 수 있다.
- 표준모형의 게이지군은 $SU(3)_C \times SU(2)_L \times U(1)_Y$이며, 대통일이론은 이를 하나의 단순군에 넣으려 한다.

## 학습 트랙에서

- [게이지 대칭과 공변 미분](/learn/gauge-theory-standard-model/01-gauge-symmetry) 단원에서 유도를 다룬다.
