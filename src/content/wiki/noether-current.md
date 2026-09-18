---
titleKo: 네터 흐름
titleEn: Noether current
summary: 연속 대칭에 대응하는 보존류. 시공간 적분한 시간 성분이 보존 전하가 된다.
aliases: [네터 전류, 보존류]
tracks: [physics]
related: [lagrangian-density, gauge-symmetry]
citations: [noether1918, weinberg1995]
level: intro
status: verified
tags: [네터 정리, 보존류, 대칭]
created: 2026-09-18
updated: 2026-09-18
aiAssisted: draft
---

## 정의

무한소 변환 $\phi \to \phi + \epsilon\Delta\phi$ 아래에서 $\lag \to \lag + \epsilon\,\partial_\mu\mathcal J^\mu$이면

$$
j^\mu = \frac{\partial\lag}{\partial(\partial_\mu\phi)}\Delta\phi - \mathcal J^\mu, \qquad \partial_\mu j^\mu = 0, \qquad Q = \int\dd^3x\, j^0 .
$$

## 대표적 대응

| 대칭 | 보존량 |
| --- | --- |
| 시간 평행이동 | 에너지 |
| 공간 평행이동 | 운동량 |
| 회전 | 각운동량 |
| 전역 U(1) 위상 | 전하(입자수) |
| SU(2) 아이소스핀 | 아이소스핀 |

## 게이지 대칭과의 관계

게이지 대칭에서 네터 흐름을 구하면 게이지 장에 결합하는 전류가 나온다. 전류 보존 $\partial_\mu J^\mu = 0$은 [게이지 대칭](/wiki/gauge-symmetry)의 결과이자 게이지 불변 작용을 쓰기 위한 조건이다. 비아벨의 경우 보존은 공변적($D_\mu J^\mu = 0$)이며, 게이지 장 자체도 전하를 운반하므로 "전하"를 게이지 불변하게 정의하는 것은 미묘하다.

## 학습 트랙에서

- [네터 정리와 보존류](/learn/physics/a1/a1-3)
