/**
 * EMAIL 23 - REDEFINIR SENHA
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string
 * - resetPasswordUrl: string (URL completa para redefinir senha)
 * - expirationMinutes: number (tempo de validade - ex: 30)
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Esqueceu sua senha?
 * - Clique no botão abaixo para criar uma nova senha.
 *   Este link é válido por {expirationMinutes} minutos.
 * - Botão: "Redefinir senha"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email23ResetPasswordProps } from '../types'

export function Email23ResetPassword({
  customerName,
  resetPasswordUrl,
  expirationMinutes,
}: Email23ResetPasswordProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Esqueceu sua senha?</Title>

      <Text>
        Clique no botão abaixo para criar uma nova senha.
        <br />
        Este link é válido por {expirationMinutes} minutos.
      </Text>

      <Button href={resetPasswordUrl}>Redefinir senha</Button>
    </EmailLayout>
  )
}
