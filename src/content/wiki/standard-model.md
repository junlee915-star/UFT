---
titleKo: 표준모형
titleEn: Standard Model
summary: 강·약·전자기 상호작용을 $SU(3)_C \times SU(2)_L \times U(1)_Y$ 게이지 이론으로 기술하는 현재의 기본 이론. 약 19개의 자유 매개변수를 입력으로 받는다.
aliases: [입자물리 표준모형, SM]
tracks: [physics]
related: [electroweak-unification, gauge-symmetry, higgs-mechanism, proton-decay, running-coupling]
citations: [weinberg1967, fritzsch1975, peskin1995, schwartz2014]
level: intermediate
status: verified
tags: [표준모형, 게이지 이론, 입자물리]
created: 2026-09-19
aiAssisted: draft
---

## 정의

표준모형은 세 가지를 지정하면 결정된다. 게이지군, 페르미온의 표현, 힉스 장의 표현이다.

$$
G_{\text{SM}} = SU(3)_C \times SU(2)_L \times U(1)_Y
$$

한 세대의 페르미온은 $(3,2)_{1/3} \oplus (\bar3,1)_{-4/3} \oplus (\bar3,1)_{2/3} \oplus (1,2)_{-1} \oplus (1,1)_{2}$ 로 놓인다(왼손 바일 장 기준, $Y$ 규격화는 관습에 따라 달라진다). 이것이 세 벌 반복된다.

## 왜 이 표현들인가

| 요구 | 결과 |
| --- | --- |
| 게이지 변칙 상쇄 | 한 세대 안의 초전하 값들이 거의 유일하게 정해진다 |
| 재규격화 가능성 | 질량차원 4 이하 항만 허용된다 |
| 관측된 손지기 구조 | 약한 상호작용이 왼손 성분에만 붙는다 |

변칙 상쇄 조건 $\sum Y^3 = 0$ 과 $\sum Y = 0$ 이 쿼크와 렙톤을 한 세대 안에 묶는다. 쿼크 없이 렙톤만으로는 이론이 성립하지 않는다는 뜻이며, 이 사실이 대통일에서 둘을 한 표현에 넣는 발상의 출발점이다 [@fritzsch1975].

## 성공과 빈칸

- 성공: 중성 흐름, $W/Z$ 질량비, 점근 자유와 제트, 힉스 보손(2012). 정밀 전기약 관측량이 루프 수준까지 맞는다.
- 빈칸: 중력 없음, 중성미자 질량 없음, 암흑물질 후보 없음, 강한 CP 문제, 계층 문제.
- 매개변수: 게이지 결합 3, 유카와 9, CKM 4, 힉스 2, 강한 CP 각 1. 중성미자를 넣으면 더 늘어난다.

19 라는 숫자가 크다는 것이 [통일](/wiki/unification)의 동기다. 통일의 정도는 줄어든 자유 매개변수의 개수로 재기 때문이다.

## 대통일로 가는 실마리

세 결합상수를 [재규격화군](/wiki/renormalization-group)으로 올려 보면 $10^{15}$ GeV 부근에서 비슷해진다. 게이지군의 랭크가 4 이므로 이를 담는 단순군의 후보는 [리대수](/wiki/lie-algebra) 분류에서 $SU(5)$, $SO(10)$ 등으로 제한된다. 그 대가로 쿼크와 렙톤이 같은 표현에 들어가고, 바리온 수가 더 이상 보존되지 않아 [양성자 붕괴](/wiki/proton-decay)가 예측된다 [@peskin1995].
