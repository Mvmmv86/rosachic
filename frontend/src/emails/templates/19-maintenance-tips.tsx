/**
 * EMAIL 19 - DICAS DE CONSERVAÇÃO
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Cuidados que fazem a diferença
 * - Descubra como manter suas persianas bonitas e funcionais por muito mais tempo.
 * - Botão: "Ler guia de cuidados"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email19MaintenanceTipsProps } from '../types'

export function Email19MaintenanceTips({ customerName }: Email19MaintenanceTipsProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Cuidados que fazem a diferença</Title>

      <Text>
        Descubra como manter suas persianas bonitas e funcionais por muito mais tempo.
      </Text>

      <Button href="https://rosachic.com.br/cuidados">Ler guia de cuidados</Button>
    </EmailLayout>
  )
}
