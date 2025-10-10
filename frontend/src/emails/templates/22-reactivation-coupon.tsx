/**
 * EMAIL 22 - REATIVAÇÃO COM CUPOM (15% OFF)
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string
 * - couponCode: string (código do cupom)
 * - discountPercentage: number (percentual de desconto - ex: 15)
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Uma oferta especial só para você
 * - Botão: "Resgatar cupom"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Button } from '../components/EmailLayout'
import { Email22ReactivationCouponProps } from '../types'

export function Email22ReactivationCoupon({
  customerName,
}: Email22ReactivationCouponProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Uma oferta especial só para você</Title>

      <Button href="https://rosachic.com.br/cupom">Resgatar cupom</Button>
    </EmailLayout>
  )
}
