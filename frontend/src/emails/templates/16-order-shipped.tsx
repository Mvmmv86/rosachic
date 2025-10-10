/**
 * EMAIL 16 - PEDIDO ENVIADO
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string
 * - orderNumber: string (ex: "#12345")
 * - carrier: string (ex: "Correios")
 * - trackingCode: string (ex: "XX123456789BR")
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Boa notícia: seu pedido está a caminho!
 * - O seu pedido foi despachado. Aqui estão as informações:
 *   🧾 Número do pedido: {orderNumber}
 *   🚚 Transportadora: {carrier}
 *   🔎 Código de rastreio: {trackingCode}
 * - Botão: "Acompanhar entrega"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email16OrderShippedProps } from '../types'

export function Email16OrderShipped({
  customerName,
  orderNumber,
  carrier,
  trackingCode,
}: Email16OrderShippedProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Boa notícia: seu pedido está a caminho!</Title>

      <Text>O seu pedido foi despachado. Aqui estão as informações:</Text>

      <Text style={{ marginBottom: '8px' }}>
        🧾 Número do pedido: <strong>{orderNumber}</strong>
      </Text>
      <Text style={{ marginBottom: '8px' }}>
        🚚 Transportadora: <strong>{carrier}</strong>
      </Text>
      <Text style={{ marginBottom: '24px' }}>
        🔎 Código de rastreio: <strong>{trackingCode}</strong>
      </Text>

      <Button href={`https://rosachic.com.br/rastreamento/${trackingCode}`}>
        Acompanhar entrega
      </Button>
    </EmailLayout>
  )
}
