---
title: 최소 SU(5) 양성자 수명의 차원 분석 추정
summary: X 보손 교환으로 유도되는 p → e⁺π⁰ 수명을 차원 분석으로 추정하고 슈퍼카미오칸데 한계와 비교. 정밀 계산 전 어림값 확인용.
tags: [양성자 붕괴, SU(5), 대통일]
difficulty: 고급
status: 검토 중
created: 2026-09-16
---

## 어림 계산

X 보손 교환은 저에너지에서 차원 6 연산자 $\dfrac{g^2_{\text{GUT}}}{M_X^2}\,(qq)(ql)$을 만든다. 붕괴율은 진폭의 제곱에 위상공간 $m_p^5$를 곱한 꼴이므로

$$
\Gamma \sim \alpha_{\text{GUT}}^2\,\frac{m_p^5}{M_X^4}, \qquad \tau_p = \frac{1}{\Gamma}. \label{gamma}
$$

$\alpha_{\text{GUT}} \approx 1/40$, $m_p \approx 0.94\ \text{GeV}$, $M_X \approx 3\times10^{14}\ \text{GeV}$를 넣으면

$$
\tau_p \sim \frac{1600 \times (3\times10^{14})^4}{0.94^5}\ \text{GeV}^{-1}
\approx 1.8\times10^{61}\ \text{GeV}^{-1}
\approx 1.8\times10^{61}\times 2.1\times10^{-32}\ \text{yr}
\approx 4\times10^{29}\ \text{yr}.
$$

## 실험과 비교

슈퍼카미오칸데의 한계 $\tau/B(p\to e^+\pi^0) > 2.4\times10^{34}$ yr [@superk2020]와 @eq:gamma 의 추정은 약 5자리 차이가 난다. $\tau \propto M_X^4$이므로 $M_X$를 약 20배 올려야 하고, 이는 초대칭 SU(5)의 $M_{\text{GUT}} \approx 2\times10^{16}$ GeV와 부합한다. 다만 초대칭 모형에서는 차원 5 연산자(힉시노 교환)에 의한 $p\to K^+\bar\nu$가 더 위험하다.

## 할 일

- [ ] 하드론 행렬원소(격자 QCD 값 $\alpha_H \approx 0.01\ \text{GeV}^3$)를 넣은 정밀식으로 다시 계산
- [ ] 하이퍼-카미오칸데 예상 감도($\sim 10^{35}$ yr) 반영
