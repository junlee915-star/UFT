---
titleKo: 유효장이론
titleEn: Effective field theory
summary: 관심 있는 에너지 척도 아래의 자유도만 남기고 위쪽을 적분해 없앤 이론. 고에너지 이론을 몰라도 저에너지 예측을 통제된 오차로 할 수 있게 해 준다.
aliases: [EFT, 유효 이론]
tracks: [physics, synthesis]
related: [renormalization-group, proton-decay, standard-model, path-integral, emergence-reduction, grounding]
citations: [weinberg1995, schwartz2014, anderson1972, cao1997]
level: advanced
status: verified
tags: [유효장이론, 척도 분리, 환원]
created: 2026-09-19
aiAssisted: draft
---

## 정의

차단 척도 $\Lambda$ 를 정하고 그보다 무거운 장을 [경로적분](/wiki/path-integral)에서 적분해 없애면, 남은 가벼운 장에 대한 작용이 국소 연산자의 무한 급수로 나온다.

$$
\lag_{\text{eff}} = \lag_{d\le4} + \sum_{d>4} \frac{c_i}{\Lambda^{\,d-4}}\,\mathcal O_i^{(d)}
$$

차원 $d$ 가 클수록 $(E/\Lambda)^{d-4}$ 로 억제되므로, 원하는 정밀도에 필요한 항의 개수가 유한하다. 이것이 유효 이론이 예측력을 갖는 이유다 [@weinberg1995].

## 연산자의 세 종류

| 종류 | 질량차원 | 저에너지로 갈수록 | 예 |
| --- | --- | --- | --- |
| 연관 (relevant) | $d < 4$ | 커진다 | 질량항 $m^2\phi^2$ |
| 주변 (marginal) | $d = 4$ | 로그로 흐른다 | $g$, $\lambda$ |
| 무관 (irrelevant) | $d > 4$ | 작아진다 | 페르미 4-페르미온 항 |

[재규격화군](/wiki/renormalization-group)의 언어로는 무관 연산자가 흐름에서 지워지는 방향이다. 저에너지 물리가 고에너지의 세부에 둔감한 것은 우연이 아니라 이 구조의 결과다.

## 두 가지 사용법

- **상향식**: 무거운 장을 알고 적분해 없앤다. $W$ 보손에서 페르미 이론 $G_F/\sqrt2 = g^2/8m_W^2$ 이 나오는 경우.
- **하향식**: 무거운 것이 무엇인지 모른 채 대칭만으로 허용 연산자를 열거하고 계수를 실험으로 잰다. [양성자 붕괴](/wiki/proton-decay)의 차원 6 연산자와 중성미자 질량의 와인버그 연산자가 이 방식이다.

[표준모형](/wiki/standard-model) 자체도 어떤 더 높은 이론의 유효 이론일 수 있으며, 이 관점에서 재규격화 가능성은 근본 조건이 아니라 $\Lambda$ 가 충분히 높다는 사실의 반영이다 [@schwartz2014].

## 철학적 함의

유효장이론은 층위 사이의 관계를 정량적으로 준다. 저층의 계수가 고층에서 결정되지만, 역으로 저층의 측정은 고층을 유일하게 결정하지 못한다. 이 비대칭이 [창발과 환원](/wiki/emergence-reduction) 논쟁에서 자주 인용되며, "더 많은 것은 다르다"는 주장에 구체적인 형식을 준다 [@anderson1972]. 다만 계산상의 의존을 존재론적 [근거지음](/wiki/grounding)으로 번역하려면 별도의 논증이 필요하다 [@cao1997].
