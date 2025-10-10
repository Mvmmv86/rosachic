/**
 * EMAIL 01 - BEM-VINDO
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string (nome do cliente)
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Seja muito bem vindo. É um prazer ter você com a gente!
 * - Na Rosa Chic, acreditamos que cada detalhe faz diferença no seu ambiente.
 *   Aproveite um cupom exclusivo para sua primeira compra.
 * - Botão: "Explorar Coleção"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email01WelcomeProps } from '../types'

export function Email01Welcome({ customerName }: Email01WelcomeProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>
        Seja muito bem vindo.
        <br />É um prazer ter você com a gente!
      </Title>

      <Text>
        Na Rosa Chic, acreditamos que cada detalhe faz diferença no seu ambiente.
        Aproveite um cupom exclusivo para sua primeira compra.
      </Text>

      <Button href="https://rosachic.com.br/colecao">
        Explorar Coleção
      </Button>
    </EmailLayout>
  )
}
