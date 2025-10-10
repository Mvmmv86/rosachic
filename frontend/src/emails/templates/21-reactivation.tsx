/**
 * EMAIL 21 - REATIVAÇÃO (SENTIMOS SUA FALTA)
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Descubra as novidades que preparamos para você
 * - Botão: "Explorar novidades"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Button } from '../components/EmailLayout'
import { Email21ReactivationProps } from '../types'

export function Email21Reactivation({ customerName }: Email21ReactivationProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Descubra as novidades que preparamos para você</Title>

      <Button href="https://rosachic.com.br/novidades">Explorar novidades</Button>
    </EmailLayout>
  )
}
