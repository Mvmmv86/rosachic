/**
 * EMAIL 05 e 06 - TRANSFORMAMOS AMBIENTES (IDÊNTICOS)
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string (nome do cliente)
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Inspirações que encantam
 * - Conheça projetos entregues e avaliações de clientes.
 * - Botão: "Ver projetos"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email05_06ProjectsProps } from '../types'

export function Email05_06Projects({ customerName }: Email05_06ProjectsProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Inspirações que encantam</Title>

      <Text>
        Conheça projetos entregues e avaliações de clientes.
      </Text>

      <Button href="https://rosachic.com.br/projetos">
        Ver projetos
      </Button>
    </EmailLayout>
  )
}
