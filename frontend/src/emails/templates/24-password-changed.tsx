/**
 * EMAIL 24 - SENHA ALTERADA
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Alteração de senha confirmada
 * - Se você não realizou essa alteração, entre em contato imediatamente com nosso suporte.
 * - Botão: "Falar com suporte"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email24PasswordChangedProps } from '../types'

export function Email24PasswordChanged({ customerName }: Email24PasswordChangedProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Alteração de senha confirmada</Title>

      <Text>
        Se você não realizou essa alteração, entre em contato imediatamente com nosso
        suporte.
      </Text>

      <Button href="https://rosachic.com.br/suporte">Falar com suporte</Button>
    </EmailLayout>
  )
}
