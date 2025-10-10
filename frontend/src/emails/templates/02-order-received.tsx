/**
 * EMAIL 02 - PEDIDO RECEBIDO
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string (nome do cliente)
 * - orderNumber: string (número do pedido)
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Seu pedido está confirmado!
 * - Obrigado por confiar na Rosa Chic. Assim que sua persiana estiver pronta, avisaremos por aqui.
 * - Botão: "Acompanhar Pedido"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email02OrderReceivedProps } from '../types'

export function Email02OrderReceived({ customerName, orderNumber }: Email02OrderReceivedProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Seu pedido está confirmado!</Title>

      <Text>
        Obrigado por confiar na Rosa Chic. Assim que sua persiana estiver pronta, avisaremos por aqui.
      </Text>

      <Button href={`https://rosachic.com.br/pedidos/${orderNumber}`}>
        Acompanhar Pedido
      </Button>
    </EmailLayout>
  )
}
