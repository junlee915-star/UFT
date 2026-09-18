---
title: 결합상수 러닝
titleEn: Running coupling
summary: 재규격화군 방정식에 따라 결합상수가 에너지 척도에 의존하는 현상. 대통일의 정량적 검증 수단이다.
aliases: [재규격화군 흐름, 러닝 커플링]
related: [yang-mills-action]
difficulty: 고급
status: 검토 중
tags: [결합상수 러닝, 재규격화군, 대통일]
created: 2026-09-18
---

## 정의

$$
\mu\frac{\dd g}{\dd\mu} = \beta(g) = -\frac{b\,g^3}{16\pi^2} + O(g^5)
$$

$\alpha = g^2/4\pi$로 쓰면 1-루프에서

$$
\frac{1}{\alpha(\mu)} = \frac{1}{\alpha(\mu_0)} + \frac{b}{2\pi}\ln\frac{\mu}{\mu_0}.
$$

## 1-루프 계수

게이지군 $G$, 페르미온(바일) 표현 $R_f$, 복소 스칼라 표현 $R_s$에 대해

$$
b = \frac{11}{3}C_2(G) - \frac{2}{3}\sum_f T(R_f) - \frac{1}{3}\sum_s T(R_s).
$$

표준모형(SU(5) 규격화된 $U(1)_Y$, 힉스 이중항 1개)에서 $(b_1, b_2, b_3) = (-\tfrac{41}{10}, \tfrac{19}{6}, 7)$. 부호 규약에 따라 $b_i$의 부호가 반대로 쓰이기도 하므로 항상 $1/\alpha$의 기울기 방향을 확인한다.

## 대통일과의 관계

세 결합상수가 한 척도 $M_{\text{GUT}}$에서 만난다는 것은 두 개의 입력($\alpha_1, \alpha_2$)으로 하나의 예측($\alpha_3$ 또는 $\sin^2\theta_W$)을 하는 것이다. 표준모형만으로는 약 몇 퍼센트 어긋나고, MSSM에서는 $M_{\text{GUT}} \approx 2\times10^{16}$ GeV에서 잘 맞는다. 자세한 수치는 [SU(5) 단원](/learn/grand-unification/01-su5)을 참고.
