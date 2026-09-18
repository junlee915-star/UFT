---
title: 맥스웰 이론의 공변 형식
summary: 네 개의 맥스웰 방정식을 장세기 텐서 하나와 라그랑지안 한 줄로 다시 쓰고, 그 라그랑지안이 이미 U(1) 게이지 불변임을 확인합니다.
module: classical-field-theory
order: 3
prerequisites: [classical-field-theory/01-lagrangian-field-theory, classical-field-theory/02-noether-theorem]
difficulty: 입문
status: 검토 중
tags: [전자기학, 장세기 텐서, 게이지 불변성]
created: 2026-09-18
estimatedMinutes: 40
---

## 동기

맥스웰 이론은 최초의 "통일장이론"입니다. 전기와 자기를 한 장 $A_\mu$로 묶었고, 그 형식은 이후 양-밀스 이론의 원형이 됩니다.

## 핵심 수식

퍼텐셜 $A_\mu = (\varphi, -\mathbf A)$로부터 [장세기 텐서](/wiki/field-strength)를 정의합니다.

$$
F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\mu . \label{fmunu}
$$

성분으로는 $F_{0i} = E_i$, $F_{ij} = -\epsilon_{ijk}B_k$입니다. 라그랑지안 밀도는

$$
\lag = -\tfrac14 F_{\mu\nu}F^{\mu\nu} - J^\mu A_\mu , \label{maxwell-lag}
$$

이며 오일러-라그랑주 방정식은 $\partial_\mu F^{\mu\nu} = J^\nu$(비균질 방정식 두 개), 정의 @eq:fmunu 의 항등식 $\partial_{[\lambda}F_{\mu\nu]} = 0$이 나머지 두 개(균질 방정식)입니다.

## 게이지 불변성

$A_\mu \to A_\mu + \partial_\mu\chi$로 바꾸어도 @eq:fmunu 는 변하지 않습니다. $-J^\mu A_\mu$ 항은 $-J^\mu\partial_\mu\chi = -\partial_\mu(J^\mu\chi) + \chi\,\partial_\mu J^\mu$로 바뀌는데, 전류가 보존되면($\partial_\mu J^\mu = 0$) 전체 미분만 남으므로 작용은 불변입니다. **전류 보존과 게이지 불변성은 같은 동전의 양면**입니다. 이 관계가 [게이지 대칭](/wiki/gauge-symmetry) 항목의 핵심 논지입니다.

## 예제: 광자의 자유도 세기

$A_\mu$는 성분이 넷이지만, 게이지 자유도로 하나를 제거하고(예: 로렌츠 게이지 $\partial_\mu A^\mu = 0$), $A_0$가 운동 방정식에서 역학적 변수가 아니라는 사실로 하나 더 제거하면 물리적 편광은 둘입니다. 이 셈법은 질량 없는 스핀 1 입자의 일반적 성질이며, 힉스 기작에서 게이지 보손이 질량을 얻을 때 편광이 셋으로 늘어나는 이유를 설명합니다.

## 연습문제

1. @eq:maxwell-lag 에서 $\partial_\mu F^{\mu\nu} = J^\nu$를 직접 유도하시오.

<details>
<summary>해설</summary>

$\partial\lag/\partial(\partial_\mu A_\nu) = -F^{\mu\nu}$(계수 $\tfrac14 \times 2 \times 2$를 확인), $\partial\lag/\partial A_\nu = -J^\nu$. 오일러-라그랑주 방정식은 $-\partial_\mu F^{\mu\nu} + J^\nu = 0$.

</details>

2. 질량항 $\tfrac12 m^2 A_\mu A^\mu$를 더하면 게이지 불변성이 깨짐을 보이고, 이때 $\partial_\mu A^\mu = 0$이 운동 방정식의 결과로 따라옴을 확인하시오(프로카 이론).

## 더 읽기

- Carroll 1장은 같은 내용을 미분형식으로 다시 쓴다 [@carroll2004]
