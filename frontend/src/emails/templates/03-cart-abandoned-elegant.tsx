/**
 * EMAIL 03 - CARRINHO ABANDONADO (ELEGANTE)
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string (nome do cliente)
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Ainda pensando na sua escolha?
 * - Seus itens estão esperando por você. Garanta já antes que acabem!
 * - Botão: "Finalizar Compra"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email03CartAbandonedProps } from '../types'

export function Email03CartAbandonedElegant({ customerName }: Email03CartAbandonedProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Ainda pensando na sua escolha?</Title>

      <Text>
        Seus itens estão esperando por você. Garanta já antes que acabem!
      </Text>

      <Button href="https://rosachic.com.br/carrinho">
        Finalizar Compra
      </Button>
    </EmailLayout>
  )
}
