/**
 * EMAIL 04 - COMO MEDIR
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string (nome do cliente)
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Medição sem mistério
 * - Siga nosso guia visual para medir largura e altura.
 * - (Sem botão neste email)
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text } from '../components/EmailLayout'
import { Email04HowToMeasureProps } from '../types'

export function Email04HowToMeasure({ customerName }: Email04HowToMeasureProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Medição sem mistério</Title>

      <Text>
        Siga nosso guia visual para medir largura e altura.
      </Text>

      {/* Aqui pode ser adicionado um guia visual/imagem no futuro */}
    </EmailLayout>
  )
}
