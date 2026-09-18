---
titleKo: 클라인-고든 방정식
titleEn: Klein–Gordon equation
summary: 스핀 0 장이 따르는 상대론적 파동방정식. 분산관계 $E^2 = \vec p^{\,2} + m^2$ 을 장방정식으로 옮겨 적은 것이다.
aliases: [KG 방정식, 스칼라 장 방정식]
tracks: [physics]
related: [lagrangian-density, action-principle, higgs-mechanism, path-integral]
citations: [peskin1995, srednicki2007, schwartz2014]
level: intermediate
status: verified
tags: [스칼라 장, 전파인자, 질량]
created: 2026-09-19
aiAssisted: draft
---

## 정의

실수 스칼라 장의 라그랑지안 밀도

$$
\lag = \tfrac12\,\partial_\mu\phi\,\partial^\mu\phi - \tfrac12 m^2\phi^2
$$

에 [작용 원리](/wiki/action-principle)를 적용하면 오일러-라그랑주 방정식이 다음을 준다.

$$
\left(\Box + m^2\right)\phi = 0,
\qquad \Box \equiv \partial_\mu\partial^\mu.
$$

평면파 $\phi \sim e^{-ip\cdot x}$ 를 넣으면 $p^2 = m^2$, 곧 $E^2 = \vec p^{\,2} + m^2$ 이다. 방정식의 내용은 사실상 이 한 줄이다.

## 왜 단일입자 파동함수로는 실패하는가

| 문제 | 내용 |
| --- | --- |
| 음에너지 해 | $E = \pm\sqrt{\vec p^{\,2}+m^2}$ 의 두 부호가 모두 해다 |
| 확률밀도 | 보존 흐름의 0성분 $j^0 \propto i(\phi^*\partial_t\phi - \text{c.c.})$ 가 음수가 될 수 있다 |
| 다입자 | 상대론적 에너지에서는 입자 개수가 보존되지 않는다 |

해결은 $\phi$ 를 파동함수가 아니라 생성·소멸 연산자를 담은 **장**으로 재해석하는 것이다. 그러면 음에너지 해는 반입자의 양에너지 상태가 되고, $j^0$ 은 확률이 아니라 전하밀도가 된다 [@peskin1995].

## 전파인자와 힘의 도달거리

파인만 전파인자는 위 연산자의 역이다.

$$
\tilde D_F(p) = \frac{i}{p^2 - m^2 + i\epsilon}
$$

정적 극한에서 푸리에 변환하면 유카와 퍼텐셜 $V(r) \propto -e^{-mr}/r$ 이 나온다. 매개 입자의 질량이 곧 힘의 도달거리의 역수라는 것, 그래서 약한 상호작용이 짧은 거리에서만 작동한다는 사실이 여기서 나온다 [@srednicki2007].

## 확장

- $\partial_\mu \to D_\mu$ 로 바꾸면 하전 스칼라와 게이지 장의 상호작용이 된다. [공변 미분](/wiki/covariant-derivative) 참조.
- 퍼텐셜을 $-\mu^2|\phi|^2 + \lambda|\phi|^4$ 로 바꾸면 질량항의 부호가 뒤집혀 [자발 대칭 깨짐](/wiki/spontaneous-symmetry-breaking)과 [힉스 기작](/wiki/higgs-mechanism)으로 이어진다 [@schwartz2014].

## 실제로 어디에 쓰이는가

클라인-고든 장 자체에 해당하는 기본 입자는 힉스 보손 하나뿐이다. 그럼에도 이 방정식이 먼저 다뤄지는 이유는 두 가지다. 첫째, 스핀이 없어 지표가 붙지 않으므로 장론의 모든 절차를 가장 단순한 배경에서 연습할 수 있다. 둘째, 어떤 스핀의 장이든 각 성분은 결국 질량껍질 조건 $p^2 = m^2$ 를 만족하므로, 디랙 장이나 벡터 장의 전파인자도 이 방정식의 구조를 안에 품고 있다.
