---
titleKo: 장세기 텐서
titleEn: Field strength tensor
summary: 게이지 장의 곡률. 맥스웰 이론에서는 전기장과 자기장을 한 반대칭 텐서로 담고, 비아벨 이론에서는 게이지 장의 자기상호작용 항을 포함한다.
aliases: [전자기장 텐서, 곡률 텐서(게이지)]
tracks: [physics]
related: [covariant-derivative, yang-mills-action, gauge-symmetry]
citations: [peskin1995, carroll2004]
level: intermediate
status: verified
tags: [장세기 텐서, 전자기학]
created: 2026-09-18
updated: 2026-09-18
aiAssisted: draft
---

## 정의

$$
F_{\mu\nu} = \frac{i}{g}[D_\mu, D_\nu] = \partial_\mu A_\nu - \partial_\nu A_\mu - ig[A_\mu, A_\nu]
$$

성분으로는 $F^a_{\mu\nu} = \partial_\mu A^a_\nu - \partial_\nu A^a_\mu + g f^{abc}A^b_\mu A^c_\nu$.

## U(1)의 경우

$[A_\mu, A_\nu] = 0$이므로 $F_{\mu\nu} = \partial_\mu A_\nu - \partial_\nu A_\mu$. 성분은

$$
F_{\mu\nu} = \begin{pmatrix} 0 & E_x & E_y & E_z \\ -E_x & 0 & -B_z & B_y \\ -E_y & B_z & 0 & -B_x \\ -E_z & -B_y & B_x & 0 \end{pmatrix}
$$

(부호는 $\eta = \operatorname{diag}(+,-,-,-)$, $A^\mu = (\varphi, \mathbf A)$ 규약). 두 불변량은 $F_{\mu\nu}F^{\mu\nu} = -2(\mathbf E^2 - \mathbf B^2)$, $\epsilon^{\mu\nu\rho\sigma}F_{\mu\nu}F_{\rho\sigma} = -8\,\mathbf E\cdot\mathbf B$.

## 변환 성질

게이지 변환 아래에서 $F_{\mu\nu} \to U F_{\mu\nu} U^{-1}$. U(1)에서는 불변, 비아벨에서는 딸림표현으로 회전하므로 $\tr(F_{\mu\nu}F^{\mu\nu})$만이 불변량이다. 이것이 [양-밀스 작용](/wiki/yang-mills-action)의 형태를 결정한다.

## 비앙키 항등식

$D_{[\lambda}F_{\mu\nu]} = 0$. U(1)에서는 균질 맥스웰 방정식 $\nabla\cdot\mathbf B = 0$, $\nabla\times\mathbf E + \partial_t\mathbf B = 0$이다.
