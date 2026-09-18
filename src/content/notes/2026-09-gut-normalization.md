---
title: GUT 규격화에서 √(5/3) 인자가 붙는 이유
summary: U(1)_Y 결합상수를 SU(5) 생성자 규격화에 맞출 때 나오는 √(5/3)을 한 세대 페르미온의 초전하 제곱합으로 직접 계산해 확인한 메모.
tags: [SU(5), 결합상수 러닝, 초전하]
difficulty: 고급
status: 검토 완료
created: 2026-09-14
updated: 2026-09-18
---

## 문제

교과서는 $g_1 = \sqrt{5/3}\,g'$을 "SU(5) 규격화"라고만 적고 넘어가는 경우가 많다. 이 인자를 SU(5)를 모른다고 가정하고 표준모형 안에서만 계산해 보자.

## 계산

SU(5)의 모든 생성자는 $\bar{\mathbf 5}$(또는 $\mathbf 5$) 위에서 $\tr(T^aT^b) = \tfrac12\delta^{ab}$로 규격화된다. $Y = c\,T^{24}$라 두고 $\mathbf 5$ 안의 초전하 $(-\tfrac13,-\tfrac13,-\tfrac13,\tfrac12,\tfrac12)$로 대각합을 계산하면

$$
\tr(Y^2) = 3\cdot\tfrac19 + 2\cdot\tfrac14 = \tfrac13 + \tfrac12 = \tfrac56 . \label{trY2}
$$

$\tr(T^{24}T^{24}) = \tfrac12$이어야 하므로 $c^2 \cdot \tfrac12 = \tfrac56$, 즉 $c^2 = \tfrac53$.

같은 결과를 $\bar{\mathbf 5} \oplus \mathbf{10}$ 전체(한 세대 15개 바일 페르미온)에서 확인하면 @eq:trY2 의 비율이 유지된다. 즉 $\sum Y^2 / \sum T_3^2 = \tfrac53$이며, 이 비율은 **표준모형의 초전하 배정만으로** 결정된다. SU(5)는 이 비율에 의미를 부여할 뿐이다.

## 결론

$$
\alpha_1 = \tfrac53\,\alpha_Y, \qquad \sin^2\theta_W(M_X) = \frac{\alpha_Y}{\alpha_Y + \alpha_2}\bigg|_{\alpha_1 = \alpha_2} = \frac{3/5}{3/5 + 1} = \frac38 .
$$

@eq:trY2 의 계산은 [SU(5) 단원](/learn/grand-unification/01-su5)의 식 (1)로 연결된다. 원 논문은 [@georgi1974]이고 러닝 계산은 [@georgi1974b]다.

## 남은 질문

- SO(10)에서는 $Y$가 $\mathbf{16}$ 안에 들어가므로 같은 계산을 반복하면 어떤 인자가 나오는가? (같은 $\sqrt{5/3}$이어야 한다. SU(5) ⊂ SO(10)이므로.)
- 플립된 SU(5)에서는 $Y$가 $U(1)_X$와 섞이므로 규격화가 달라진다. 별도 노트 필요.
