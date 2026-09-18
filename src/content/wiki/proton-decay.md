---
titleKo: 양성자 붕괴
titleEn: Proton decay
summary: 바리온 수를 깨는 상호작용이 있으면 양성자가 더 가벼운 입자로 붕괴한다는 예측. 대통일이론을 실험으로 반증할 수 있게 하는 거의 유일한 통로다.
aliases: [핵자 붕괴, 바리온 수 비보존]
tracks: [physics]
related: [standard-model, effective-field-theory, unification, running-coupling, falsifiability]
citations: [georgi1974, superk2020, weinberg1995, schwartz2014]
level: advanced
status: verified
tags: [양성자 붕괴, 대통일, 바리온 수]
created: 2026-09-19
aiAssisted: draft
---

## 왜 예측되는가

[표준모형](/wiki/standard-model)에서 바리온 수 $B$ 는 우연한(accidental) 대칭이다. 게이지군과 표현을 정하고 질량차원 4 이하 항만 쓰면 $B$ 를 깨는 항을 적을 수 없을 뿐, $B$ 를 요구한 적은 없다. 대통일은 쿼크와 렙톤을 같은 표현에 넣으므로 둘을 바꾸는 게이지 보손 $X,\,Y$ 가 생기고, 그 순간 $B$ 는 더 이상 보존되지 않는다 [@georgi1974].

## 유효 연산자와 수명

$X$ 보손을 적분해 없애면 질량차원 6 의 4-페르미온 연산자가 남는다.

$$
\lag_{\text{eff}} \sim \frac{g_{\text{GUT}}^2}{M_X^2}\,(qqq\ell)
$$

차원 6 이므로 진폭이 $M_X^{-2}$, 붕괴율이 $M_X^{-4}$ 로 억제된다. 차원 분석으로

$$
\tau_p \sim \frac{M_X^4}{\alpha_{\text{GUT}}^2\, m_p^5}.
$$

$M_X \sim 10^{15}\ \text{GeV}$, $\alpha_{\text{GUT}} \sim 1/40$ 을 넣으면 $\tau_p \sim 10^{30\text{–}31}$ 년이 된다. 이 억제의 논리는 [유효장이론](/wiki/effective-field-theory)의 전형적인 예다 [@weinberg1995].

## 실험과의 대조

| 채널 | 전형적 이론값 | 관측 하한 |
| --- | --- | --- |
| $p \to e^+\pi^0$ | 최소 $SU(5)$ 에서 $10^{30\text{–}31}$ 년 | $2.4\times10^{34}$ 년 [@superk2020] |
| $p \to \bar\nu K^+$ | 초대칭 대통일에서 $10^{33\text{–}35}$ 년 | $\sim 10^{33}$ 년 |

첫 줄이 최소 $SU(5)$ 대통일이 반증된 이유다. 예측이 하한보다 서너 자릿수 낮았고 실험이 그 구간을 지웠다. 이것은 [반증가능성](/wiki/falsifiability)이 실제로 작동한 드문 사례로, 통일 가설이 형이상학적 사변과 갈라지는 지점이기도 하다.

## 남는 것

대통일 자체가 반증된 것은 아니다. $M_X$ 를 올리는 구조(초대칭, 중간 척도를 가진 $SO(10)$)는 살아 있고, 두 번째 줄의 채널이 다음 세대 검출기의 표적이다. 다만 어떤 모형이든 $M_X$ 는 [결합상수 러닝](/wiki/running-coupling)이 정해 주므로, 수명 하한은 곧 통일 척도의 하한이 된다 [@schwartz2014].
