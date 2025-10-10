/**
 * EMAIL 17 - PEDIDO ENTREGUE
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string
 * - orderNumber: string (ex: "#12345")
 * - deliveryDate: string (ex: "28/09/2025")
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Esperamos que você ame sua nova persiana
 * - Que alegria! Seu pedido foi entregue com sucesso.
 *   🧾 Número do pedido: {orderNumber}
 *   📅 Data da entrega: {deliveryDate}
 *   Gostaríamos muito de ouvir sua opinião:
 * - Botão: "Avaliar meu pedido"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email17OrderDeliveredProps } from '../types'

export function Email17OrderDelivered({
  customerName,
  orderNumber,
  deliveryDate,
}: Email17OrderDeliveredProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Esperamos que você ame sua nova persiana</Title>

      <Text>Que alegria! Seu pedido foi entregue com sucesso.</Text>

      <Text style={{ marginBottom: '8px' }}>
        🧾 Número do pedido: <strong>{orderNumber}</strong>
      </Text>
      <Text style={{ marginBottom: '24px' }}>
        📅 Data da entrega: <strong>{deliveryDate}</strong>
      </Text>

      <Text>Gostaríamos muito de ouvir sua opinião:</Text>

      <Button href={`https://rosachic.com.br/avaliar/${orderNumber}`}>
        Avaliar meu pedido
      </Button>
    </EmailLayout>
  )
}
