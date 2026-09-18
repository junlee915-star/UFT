---
title: 양-밀스 작용
titleEn: Yang–Mills action
summary: 비아벨 게이지 장의 작용. 맥스웰 작용의 일반화이며 게이지 장의 3점·4점 자기상호작용을 포함한다.
related: [field-strength, gauge-symmetry, running-coupling]
difficulty: 중급
status: 검토 완료
tags: [양-밀스, 게이지 대칭]
created: 2026-09-18
---

## 정의

$$
S_{\text{YM}} = -\frac{1}{2g^2}\int\dd^4x\;\tr\big(F_{\mu\nu}F^{\mu\nu}\big)
\quad\text{또는}\quad
-\frac14\int\dd^4x\; F^a_{\mu\nu}F^{a\,\mu\nu}
$$

첫 표현은 $A_\mu$를 $g$로 재척도한 규약($D_\mu = \partial_\mu - iA_\mu$)이고, 둘째는 $D_\mu = \partial_\mu - igA_\mu$ 규약이다.

## 전개

$F^a_{\mu\nu} = \partial_\mu A^a_\nu - \partial_\nu A^a_\mu + g f^{abc}A^b_\mu A^c_\nu$를 대입하면

$$
\lag_{\text{YM}} = -\tfrac14(\partial_\mu A^a_\nu - \partial_\nu A^a_\mu)^2
- g f^{abc}(\partial_\mu A^a_\nu)A^{b\mu}A^{c\nu}
- \tfrac14 g^2 f^{abe}f^{cde}A^a_\mu A^b_\nu A^{c\mu}A^{d\nu}.
$$

둘째 항이 3점 꼭짓점, 셋째 항이 4점 꼭짓점이다.

## 성질

- **게이지 불변**: $F \to UFU^{-1}$이고 대각합은 순환 불변.
- **결합상수는 하나**: 단순군이면 모든 자기상호작용이 하나의 $g$로 결정된다. 대통일은 표준모형의 세 결합상수를 이 성질로 하나로 묶으려는 시도다.
- **점근적 자유**: 순수 양-밀스의 1-루프 베타 함수는 $\beta(g) = -\dfrac{11 C_2(G)}{3}\dfrac{g^3}{16\pi^2}$로 음수다. [결합상수 러닝](/wiki/running-coupling) 참조.
- **위상항**: $\theta\,\dfrac{g^2}{32\pi^2}\epsilon^{\mu\nu\rho\sigma}\tr(F_{\mu\nu}F_{\rho\sigma})$을 더할 수 있으며 운동 방정식은 바꾸지 않지만 양자론적으로는 물리적이다(강한 CP 문제).

## 학습 트랙에서

- [양-밀스 이론](/learn/gauge-theory-standard-model/02-yang-mills)
