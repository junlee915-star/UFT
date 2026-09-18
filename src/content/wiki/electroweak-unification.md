---
titleKo: 전기약 통일
titleEn: Electroweak unification
summary: 약한 상호작용과 전자기 상호작용을 $SU(2)_L \times U(1)_Y$ 하나의 구조로 기술하고, 진공기댓값이 이를 $U(1)_{em}$ 으로 깨뜨린다고 보는 이론.
aliases: [전약 통일, GWS 모형, 바인베르크-살람 모형]
tracks: [physics]
related: [higgs-mechanism, standard-model, unification, spontaneous-symmetry-breaking]
citations: [glashow1961, weinberg1967, salam1968, peskin1995]
level: advanced
status: verified
tags: [전기약, 통일, 와인버그 각]
created: 2026-09-19
aiAssisted: draft
---

## 구조

게이지군은 $SU(2)_L \times U(1)_Y$ 이고 게이지 장은 $W^a_\mu$ 셋과 $B_\mu$ 하나다. 힉스 이중항이 진공기댓값 $\langle\phi\rangle = (0,\,v/\sqrt2)^T$ 를 가지면 네 생성자 중 셋이 깨지고, 전하 $Q = T^3 + Y/2$ 에 대응하는 조합 하나만 남는다.

$$
\begin{pmatrix} A_\mu \\ Z_\mu \end{pmatrix}
=
\begin{pmatrix} \cos\theta_W & \sin\theta_W \\ -\sin\theta_W & \cos\theta_W \end{pmatrix}
\begin{pmatrix} B_\mu \\ W^3_\mu \end{pmatrix},
\qquad
\tan\theta_W = \frac{g'}{g}
$$

## 예측과 입력

| 양 | 관계식 | 지위 |
| --- | --- | --- |
| $m_W$ | $\tfrac12 g v$ | $g,\,v$ 를 정하면 예측 |
| $m_Z$ | $\tfrac12\sqrt{g^2+g'^2}\,v$ | 예측 |
| $\rho$ | $m_W^2 / (m_Z^2\cos^2\theta_W) = 1$ | 힉스 이중항 가정의 검증 가능한 결과 |
| $\sin^2\theta_W$ | — | **입력**. 이 이론이 예측하지 못한다 |
| 중성 흐름 | $Z$ 교환 | 1973년 가르가멜에서 확인 |

마지막 두 줄이 핵심이다. 세 번째 줄의 $\rho = 1$ 은 트리 수준에서 성립하는 비자명한 예측이고, 네 번째 줄은 $SU(2)_L \times U(1)_Y$ 가 단순군이 아니어서 결합상수가 $g,\,g'$ 둘로 남기 때문에 생기는 빈칸이다 [@weinberg1967].

## 그래서 이것은 통일인가

[통일](/wiki/unification) 항목의 기준으로 재면 부분적이다. 두 상호작용이 한 게이지군 안에 들어가고 $W$ 와 $Z$ 의 질량비라는 새 관계가 생겼으므로 형식적 병치 이상이지만, 결합상수가 하나로 줄지 않았으므로 완전한 통일은 아니다. 와인버그 각을 예측으로 바꾸려면 두 군을 담는 단순군이 필요하고, 그것이 대통일 시도의 동기다 [@glashow1961; @salam1968].

질량 생성의 상세는 [힉스 기작](/wiki/higgs-mechanism), 이론 전체의 자리는 [표준모형](/wiki/standard-model)을 본다.

## 실험이 확인한 순서

이론이 먼저 나오고 관측이 뒤따른 드문 사례다. 1973년 중성 흐름, 1983년 $W$ 와 $Z$ 의 직접 생성, 1990년대 LEP 의 정밀 측정, 2012년 힉스 보손 순서로 확인되었다. 특히 LEP 의 정밀도는 트리 수준 관계만으로는 설명되지 않아 루프 보정을 요구했고, 그 보정이 꼭대기 쿼크와 힉스의 질량을 발견 전에 좁혀 주었다. 재규격화 가능한 게이지 이론이라는 구조가 없었다면 불가능했을 예측이다 [@peskin1995].
