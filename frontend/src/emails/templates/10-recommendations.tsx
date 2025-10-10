/**
 * EMAIL 10 - RECOMENDAÇÕES PERSONALIZADAS
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string (nome do cliente)
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Inspire-se com nossos modelos mais amados
 * - Selecionamos persianas que combinam com seu estilo.
 * - Botão: "Explorar agora"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email10RecommendationsProps } from '../types'

export function Email10Recommendations({ customerName }: Email10RecommendationsProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Inspire-se com nossos modelos mais amados</Title>

      <Text>Selecionamos persianas que combinam com seu estilo.</Text>

      <Button href="https://rosachic.com.br/recomendacoes">Explorar agora</Button>
    </EmailLayout>
  )
}
