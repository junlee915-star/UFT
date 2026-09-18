---
title: 양-밀스 이론
summary: 비아벨 게이지 장의 작용과 운동 방정식, 게이지 장 자기상호작용, 그리고 점근적 자유의 의미를 정리합니다.
module: gauge-theory-standard-model
order: 2
prerequisites: [gauge-theory-standard-model/01-gauge-symmetry]
difficulty: 중급
status: 검토 중
tags: [양-밀스, SU(N), 점근적 자유]
created: 2026-09-18
estimatedMinutes: 50
---

## 핵심 수식

[양-밀스 작용](/wiki/yang-mills-action)은 맥스웰 작용의 직접적 일반화입니다.

$$
S_{\text{YM}} = -\frac{1}{2}\int \dd^4x\; \tr\big(F_{\mu\nu}F^{\mu\nu}\big) = -\frac14\int \dd^4x\; F^a_{\mu\nu}F^{a\,\mu\nu}, \label{ym}
$$

여기서 $\tr(T^aT^b) = \tfrac12\delta^{ab}$ 규격화를 썼습니다. 운동 방정식은

$$
D_\mu F^{\mu\nu} = \partial_\mu F^{\mu\nu} - ig[A_\mu, F^{\mu\nu}] = J^\nu . \label{ym-eom}
$$

## 왜 다른가

@eq:ym 을 전개하면 $A^3$ 항과 $A^4$ 항이 나옵니다. 광자는 전하가 없지만 글루온은 색전하를 띠며 서로 상호작용합니다. 그 결과 결합상수의 [러닝](/wiki/running-coupling)이 U(1)과 반대 방향이 됩니다. 1-루프 베타 함수는

$$
\beta(g) = \mu\frac{\dd g}{\dd\mu} = -\frac{g^3}{16\pi^2}\left(\frac{11}{3}C_2(G) - \frac{4}{3}\,n_f\,T(R)\right),
$$

SU(3)에 대해 $C_2(G) = 3$, 쿼크 $T(R) = \tfrac12$이므로 $n_f \le 16$일 때 $\beta$가 음수, 즉 고에너지에서 결합이 약해집니다(점근적 자유). 이 성질이 대통일 시나리오에서 세 결합상수가 한 점에서 만날 수 있게 해 주는 열쇠입니다.

## 연습문제

1. @eq:ym 의 두 표현이 $\tr(T^aT^b) = \tfrac12\delta^{ab}$ 아래에서 일치함을 보이시오.
2. @eq:ym-eom 의 양변에 $D_\nu$를 취해 공변적으로 보존되는 전류 조건 $D_\nu J^\nu = 0$을 얻으시오.

## 더 읽기

- Peskin & Schroeder 16장 [@peskin1995]
- Schwartz 25~26장 [@schwartz2014]
