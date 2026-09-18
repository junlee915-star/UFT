---
titleKo: 재규격화군
titleEn: Renormalization group
summary: 관측 척도를 바꿀 때 이론의 결합상수들이 어떻게 흐르는지를 기술하는 구조. 고에너지 자유도를 적분해 없애는 조작에서 나온다.
aliases: [RG, 윌슨 재규격화군, 재규격화군 흐름]
tracks: [physics]
related: [running-coupling, effective-field-theory, path-integral, standard-model]
citations: [schwartz2014, weinberg1995, grosswilczek1973, politzer1973]
level: advanced
status: verified
tags: [재규격화군, 척도, 결합상수]
created: 2026-09-19
aiAssisted: draft
---

## 정의

윌슨의 정식화에서 재규격화군은 [경로적분](/wiki/path-integral)에서 운동량이 $\Lambda' < |p| < \Lambda$ 인 모드를 적분해 없애고, 남은 이론의 결합상수를 다시 읽는 조작이다. 이 조작을 반복하면 결합상수 공간 위의 흐름이 생긴다. 역과정이 없으므로 엄밀히는 군이 아니라 반군이다.

## 캘런-시만지크 방정식

물리적 상관함수는 인위적으로 고른 규격화 척도 $\mu$ 에 의존할 수 없다는 요구가 방정식이 된다.

$$
\left[\mu\frac{\partial}{\partial\mu} + \beta(g)\frac{\partial}{\partial g} + n\,\gamma(g)\right] G^{(n)}(x_1,\dots,x_n;\,g,\mu) = 0
$$

여기서 $\beta(g) = \mu\,\dd g/\dd\mu$ 이고 $\gamma$ 는 장의 비정상 차원이다. $\beta$ 함수의 해가 곧 [결합상수 러닝](/wiki/running-coupling)이다.

## 흐름의 세 가지 행태

| $\beta$ 의 부호 | 고에너지에서 | 예 |
| --- | --- | --- |
| $\beta < 0$ | 결합이 약해진다 (점근 자유) | QCD [@grosswilczek1973; @politzer1973] |
| $\beta > 0$ | 결합이 세진다 (란다우 극) | QED, 힉스 자기결합 |
| $\beta = 0$ | 고정점, 척도 불변 | 등각장론, 임계점 |

점근 자유는 비아벨 게이지 이론에서 게이지 보손의 자기상호작용이 기여 부호를 뒤집기 때문에 생긴다. 즉 [리대수](/wiki/lie-algebra)의 구조상수가 0 이 아니라는 사실의 직접적 귀결이다.

## 왜 개념적으로 중요한가

재규격화는 원래 무한대를 감추는 처방으로 여겨졌으나, 윌슨 이후에는 척도 분리의 서술로 이해된다. 고에너지에서 어떤 이론이 오든 저에너지에는 몇 개의 연관 연산자만 살아남고 나머지는 $E/\Lambda$ 의 거듭제곱으로 억제된다 [@weinberg1995]. 이 사실이 [유효장이론](/wiki/effective-field-theory)의 근거이며, 동시에 저에너지 실험이 고에너지 이론을 유일하게 결정하지 못하는 이유이기도 하다 [@schwartz2014].
