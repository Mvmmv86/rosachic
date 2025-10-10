/**
 * EMAIL 07 - POR QUE ESCOLHER ROSA CHIC
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string (nome do cliente)
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Qualidade, design e atendimento que você merece
 * - Nossa missão é unir beleza e funcionalidade em cada persiana.
 *   ✔️ Materiais premium
 *   ✔️ Instalação fácil
 *   ✔️ Suporte dedicado
 * - Botão: "Descubra os diferenciais"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email07WhyChooseProps } from '../types'

export function Email07WhyChoose({ customerName }: Email07WhyChooseProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Qualidade, design e atendimento que você merece</Title>

      <Text>
        Nossa missão é unir beleza e funcionalidade em cada persiana.
        <br />
        ✔️ Materiais premium
        <br />
        ✔️ Instalação fácil
        <br />
        ✔️ Suporte dedicado
      </Text>

      <Button href="https://rosachic.com.br/diferenciais">
        Descubra os diferenciais
      </Button>
    </EmailLayout>
  )
}
