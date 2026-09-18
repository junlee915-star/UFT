---
titleKo: 리대수
titleEn: Lie algebra
summary: 리 군의 항등원 근방을 선형화한 대수 구조. 생성자들의 교환관계 하나가 군의 국소 구조 전부를 담는다.
aliases: [리 대수, Lie algebra, 생성자 대수]
tracks: [physics]
related: [gauge-symmetry, yang-mills-action, standard-model, unification]
citations: [zee2016, nakahara2003, peskin1995]
level: intermediate
status: verified
tags: [군론, 대칭, 리대수]
created: 2026-09-19
aiAssisted: draft
---

## 정의

리 군 $G$ 의 원소를 항등원 근방에서 $U = \exp(i\alpha^a T^a)$ 로 쓸 때, 생성자 $T^a$ 가 이루는 벡터공간에 교환자를 곱셈으로 준 것이 리대수 $\mathfrak g$ 다.

$$
[T^a,\,T^b] = i f^{abc}\,T^c
$$

$f^{abc}$ 를 구조상수라 한다. 야코비 항등식 $[[T^a,T^b],T^c] + (\text{순환}) = 0$ 이 구조상수에 대한 제약이 된다.

## 규격화와 불변량

표현 $R$ 에 대해 지표 $T(R)$ 과 이차 카시미르 $C_2(R)$ 을 다음으로 정의한다.

$$
\tr\!\left(T^a_R T^b_R\right) = T(R)\,\delta^{ab},
\qquad
T^a_R T^a_R = C_2(R)\,\mathbf 1
$$

수반표현에서는 $T(\text{adj}) = C_2(G)$ 이고 $(T^a_{\text{adj}})^{bc} = -if^{abc}$ 다. 이 두 수가 [결합상수 러닝](/wiki/running-coupling)의 1-루프 계수를 직접 결정한다.

## 물리에 쓰이는 단순 리대수

| 리대수 | 군 | 차원 | 랭크 | 쓰이는 곳 |
| --- | --- | --- | --- | --- |
| $\mathfrak{su}(2)$ | $SU(2)$ | 3 | 1 | 스핀, 약아이소스핀 |
| $\mathfrak{su}(3)$ | $SU(3)$ | 8 | 2 | 색 (QCD) |
| $\mathfrak{su}(5)$ | $SU(5)$ | 24 | 4 | 최소 대통일 |
| $\mathfrak{so}(10)$ | $SO(10)$ | 45 | 5 | 한 세대를 16차원 표현 하나에 |

랭크는 서로 교환하는 생성자의 최대 개수이며, 진단 가능한 양자수의 개수와 같다. 표준모형 게이지군의 랭크가 4 이므로 이를 담는 단순군의 랭크는 4 이상이어야 한다. 이 조건이 [통일](/wiki/unification) 후보군을 좁히는 첫 필터다 [@zee2016].

## 게이지 이론과의 관계

[게이지 대칭](/wiki/gauge-symmetry)을 국소화하면 생성자 하나마다 게이지 장이 하나씩 생긴다. 게이지 보손의 개수는 리대수의 차원이다. 또한 구조상수가 0 이 아니면 게이지 장이 스스로와 상호작용하며, 이것이 [야마-밀스 작용](/wiki/yang-mills-action)의 삼중·사중 꼭짓점의 기원이다 [@peskin1995].

## 흔한 혼동

- 리 군과 리대수는 다르다. 리대수가 같아도 전역 구조가 다를 수 있다. $SU(2)$ 와 $SO(3)$ 는 리대수가 같지만 전자가 후자의 이중 덮개다. 이 차이가 자기홀극의 존재 여부 같은 위상적 질문에서 드러난다 [@nakahara2003].
- 물리에서 쓰는 에르미트 생성자 $T^a$ 와 수학에서 쓰는 반에르미트 규약은 $i$ 하나만큼 다르다. 구조상수의 정의에 $i$ 가 붙는지 확인하지 않으면 부호가 어긋난다.
