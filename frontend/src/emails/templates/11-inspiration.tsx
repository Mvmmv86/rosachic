/**
 * EMAIL 11 - INSPIRAÇÕES DE DECORAÇÃO
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string (nome do cliente)
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Ideias para decorar com persianas Rosa Chic
 * - Veja como nossas persianas trazem modernidade e conforto para qualquer ambiente.
 * - Botão: "Veja mais inspirações"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email11InspirationProps } from '../types'

export function Email11Inspiration({ customerName }: Email11InspirationProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Ideias para decorar com persianas Rosa Chic</Title>

      <Text>
        Veja como nossas persianas trazem modernidade e conforto para qualquer ambiente.
      </Text>

      <Button href="https://rosachic.com.br/inspiracoes">Veja mais inspirações</Button>
    </EmailLayout>
  )
}
