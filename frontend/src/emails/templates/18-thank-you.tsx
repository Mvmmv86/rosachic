/**
 * EMAIL 18 - AGRADECIMENTO
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Seu espaço nunca mais será o mesmo
 * - Sua escolha faz parte da nossa história. Obrigado por permitir que a Rosa Chic transforme o seu lar.
 * - Botão: "Compartilhar feedback"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email18ThankYouProps } from '../types'

export function Email18ThankYou({ customerName }: Email18ThankYouProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Seu espaço nunca mais será o mesmo</Title>

      <Text>
        Sua escolha faz parte da nossa história. Obrigado por permitir que a Rosa Chic
        transforme o seu lar.
      </Text>

      <Button href="https://rosachic.com.br/feedback">Compartilhar feedback</Button>
    </EmailLayout>
  )
}
