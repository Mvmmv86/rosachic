/**
 * EMAIL 20 - CROSS-SELL (COMBINE COM OUTROS MODELOS)
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - O toque final que seu ambiente merece
 * - Veja persianas que combinam perfeitamente com a sua compra.
 * - Botão: "Ver combinações"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email20CrossSellProps } from '../types'

export function Email20CrossSell({ customerName }: Email20CrossSellProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>O toque final que seu ambiente merece</Title>

      <Text>Veja persianas que combinam perfeitamente com a sua compra.</Text>

      <Button href="https://rosachic.com.br/combinacoes">Ver combinações</Button>
    </EmailLayout>
  )
}
