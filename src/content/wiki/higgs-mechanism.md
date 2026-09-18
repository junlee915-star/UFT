---
titleKo: 힉스 기작
titleEn: Higgs mechanism
summary: 게이지 대칭이 자발적으로 깨질 때 남아야 할 골드스톤 보손이 게이지 장에 흡수되어 게이지 보손이 질량을 얻는 과정.
aliases: [브라우트-앙글레르-힉스 기작, BEH 기작]
tracks: [physics]
related: [spontaneous-symmetry-breaking, gauge-symmetry, electroweak-unification, standard-model]
citations: [higgs1964, englert1964, weinberg1967, peskin1995]
level: advanced
status: verified
tags: [힉스, 질량, 대칭 깨짐]
created: 2026-09-19
aiAssisted: draft
---

## 문제

[게이지 대칭](/wiki/gauge-symmetry)은 질량항 $m^2 A_\mu A^\mu$ 을 금지한다. 그런데 $W$ 와 $Z$ 는 질량이 있다. 질량을 손으로 넣으면 이론의 유니타리성과 재규격화 가능성이 무너진다.

## 아벨 모형에서의 과정

복소 스칼라와 $U(1)$ 게이지 장을 두고

$$
\lag = -\tfrac14 F_{\mu\nu}F^{\mu\nu} + |D_\mu\phi|^2 + \mu^2|\phi|^2 - \lambda|\phi|^4
$$

를 쓰면 $\mu^2 > 0$ 일 때 최소는 $|\phi| = v/\sqrt2$, $v = \mu/\sqrt\lambda$ 다. $\phi = \tfrac{1}{\sqrt2}(v+h)e^{i\theta/v}$ 로 두면 위상 $\theta$ 는 게이지 변환으로 없앨 수 있고(유니타리 게이지), $|D_\mu\phi|^2$ 의 전개에서

$$
\tfrac12 g^2 v^2 A_\mu A^\mu
$$

이 나온다. 곧 $m_A = g v$ 다.

## 자유도 세기

| | 깨지기 전 | 깨진 뒤 |
| --- | --- | --- |
| 게이지 장 | 무질량 2 (횡파) | 유질량 3 (횡파 2 + 종파 1) |
| 스칼라 | 2 (실수 성분 2개) | 1 (힉스 $h$) |
| 합계 | 4 | 4 |

골드스톤 보손이 사라진 것이 아니라 게이지 보손의 종편극 성분이 된다. 흔히 쓰는 "먹혔다"는 표현이 가리키는 내용이 이 표다 [@peskin1995].

## 정확히 무엇이 일어나는가

- 게이지 대칭 자체는 깨지지 않는다. 엘리추르 정리에 따라 국소 대칭은 자발적으로 깨질 수 없고, 깨지는 것은 게이지를 고정한 뒤의 전역 대칭이다. [자발 대칭 깨짐](/wiki/spontaneous-symmetry-breaking) 항목과 함께 읽는다.
- 질량의 기원은 진공이지 입자가 아니다. 진공기댓값 $v \approx 246\ \text{GeV}$ 가 척도를 준다.
- 페르미온 질량은 별개의 유카와 결합 $-y_f \bar\psi_L \phi \psi_R$ 에서 나오며, 유카와 결합상수는 이론이 예측하지 못하는 입력이다.

전기약 이론에서의 구체적 적용은 [전기약 통일](/wiki/electroweak-unification)에서 다룬다 [@higgs1964; @englert1964; @weinberg1967].

## 왜 이 기작이어야 했는가

질량을 손으로 넣은 벡터 보손 이론에서는 종편극 성분의 진폭이 에너지에 따라 커져 $\sqrt{s} \sim 4\pi v$ 부근에서 유니타리성이 깨진다. 힉스 보손의 교환이 이 증가를 정확히 상쇄한다. 곧 힉스는 질량을 주기 위해 도입된 장치인 동시에, 이론이 높은 에너지까지 의미를 유지하기 위한 필수 조건이다. 2012년에 발견된 보손이 이 역할을 하는지는 결합상수가 질량에 비례하는지를 재서 확인한다.
