---
title: 공변 미분
titleEn: Covariant derivative
summary: 게이지 변환 아래에서 장과 같은 방식으로 변환하도록 보정된 미분. 게이지 장과 물질장의 결합을 규정한다.
aliases: [게이지 공변 미분]
related: [gauge-symmetry, field-strength]
difficulty: 중급
status: 검토 완료
tags: [게이지 대칭, 공변 미분]
created: 2026-09-18
---

## 정의

$$
D_\mu = \partial_\mu - i g A^a_\mu T^a
$$

여기서 $T^a$는 장이 속한 표현의 생성자다. 부호와 $i$의 위치는 교과서마다 다르므로 주의한다. Peskin & Schroeder는 $D_\mu = \partial_\mu - igA^a_\mu t^a$를 쓴다.

## 성질

- **공변성**: $\psi \to U\psi$이면 $D_\mu\psi \to U D_\mu\psi$.
- **교환자가 장세기**: $[D_\mu, D_\nu] = -ig F_{\mu\nu}$. 이것이 [장세기 텐서](/wiki/field-strength)의 좌표 무관 정의다.
- **최소 결합**: 자유 라그랑지안의 $\partial_\mu$를 $D_\mu$로 바꾸는 것만으로 상호작용항이 결정된다. 예를 들어 디랙 장에서 $\bar\psi i\gamma^\mu D_\mu\psi = \bar\psi i\gamma^\mu\partial_\mu\psi + g\,\bar\psi\gamma^\mu T^a\psi\,A^a_\mu$.

## 일반상대론과의 비유

일반상대론의 공변 미분 $\nabla_\mu V^\nu = \partial_\mu V^\nu + \Gamma^\nu_{\mu\lambda}V^\lambda$에서 크리스토펠 기호가 하는 역할을 게이지 이론에서는 $A_\mu$가 한다. 두 경우 모두 "접속(connection)"이며, 곡률은 접속의 교환자로 정의된다. 이 기하학적 공통점이 [게이지 대칭](/wiki/gauge-symmetry)과 중력을 함께 다루려는 통일 시도의 출발점이다.
