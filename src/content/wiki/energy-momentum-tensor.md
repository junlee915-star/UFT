---
titleKo: 에너지-운동량 텐서
titleEn: Energy–momentum tensor
summary: 시공간 평행이동 대칭에서 나오는 네 개의 보존류를 한데 모은 2계 텐서. 성분이 에너지 밀도, 운동량 밀도, 응력을 담고, 일반상대론에서는 중력의 원천이 된다.
aliases: [응력-에너지 텐서, 스트레스-에너지 텐서]
tracks: [physics]
related: [noether-current, lagrangian-density]
citations: [noether1918, weinberg1995, carroll2004]
level: intermediate
status: verified
tags: [네터 정리, 보존류, 일반상대론]
created: 2026-09-19
aiAssisted: draft
---

## 정의

시공간 평행이동 $x^\mu \to x^\mu + a^\mu$ 에 대응하는 네터 흐름을 지표 하나로 묶은 것이다. 라그랑지안 밀도가 좌표에 명시적으로 의존하지 않을 때

$$
T^{\mu}{}_{\nu} = \frac{\partial\lag}{\partial(\partial_\mu\phi)}\,\partial_\nu\phi - \delta^\mu_\nu\,\lag , \qquad \partial_\mu T^{\mu}{}_{\nu} = 0 .
$$

이 형태를 정준(canonical) 에너지-운동량 텐서라 부른다.

## 성분이 뜻하는 것

| 성분 | 뜻 |
| --- | --- |
| $T^{00}$ | 에너지 밀도. 해밀토니안 밀도와 같다 |
| $T^{0i}$ | 운동량 밀도 |
| $T^{i0}$ | 에너지 흐름 |
| $T^{ij}$ | 응력. 대각 성분은 압력 |

보존 전하는 $P^\nu = \int \dd^3x\, T^{0\nu}$ 이고, $P^0$ 이 에너지, $P^i$ 가 운동량이다.

## 정준 텐서의 문제와 벨린판테 개선

정준 텐서는 일반적으로 두 지표에 대해 대칭이 아니다. 스칼라 장에서는 우연히 대칭이지만, 벡터 장과 스피너 장에서는 스핀 각운동량의 기여 때문에 어긋난다. 앞 두 지표에 반대칭인 $B^{\lambda\mu\nu}$ 를 써서

$$
T^{\mu\nu}_{\text{개선}} = T^{\mu\nu} + \partial_\lambda B^{\lambda\mu\nu}
$$

로 고치면 보존은 그대로 두면서 대칭 텐서를 얻는다. 이것이 벨린판테 개선이다. 대칭성이 필요한 이유는 아인슈타인 방정식 $G_{\mu\nu} = 8\pi G\, T_{\mu\nu}$ 의 좌변이 대칭이기 때문이다.

## 통일 문제에서의 위치

에너지-운동량 텐서는 물질이 중력에 결합하는 유일한 통로다. 게이지 이론에서 물질이 게이지 장에 결합할 때는 [네터 흐름](/wiki/noether-current)이 통로가 되고, 중력에서는 이 텐서가 그 역할을 한다. 두 결합 방식이 형식적으로 얼마나 닮았고 어디서 갈라지는지가 중력을 다른 힘과 함께 다루려는 시도의 출발점이다.
