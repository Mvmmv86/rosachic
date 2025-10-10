/**
 * EMAIL 15 - PEDIDO CONFIRMADO (DETALHADO)
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string
 * - order: OrderDetails {
 *     orderNumber: string (ex: "#12345")
 *     orderDate: string (ex: "24/09/2025")
 *     items: ProductItem[] (array de produtos)
 *     total: number (valor total)
 *   }
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Obrigado pela sua compra!
 * - Recebemos seu pedido com sucesso! Aqui estão os detalhes:
 *   🧾 Número do pedido: {orderNumber}
 *   📅 Data da compra: {orderDate}
 *   📦 Itens do pedido:
 *   [Lista de produtos]
 *   💳 Total: R$ {total}
 *   Você receberá um novo e-mail assim que seu pedido for enviado.
 * - Botão: "Acompanhar pedido"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email15OrderConfirmedProps } from '../types'

export function Email15OrderConfirmed({
  customerName,
  order,
}: Email15OrderConfirmedProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Obrigado pela sua compra!</Title>

      <Text>Recebemos seu pedido com sucesso! Aqui estão os detalhes:</Text>

      <Text style={{ marginBottom: '8px' }}>
        🧾 Número do pedido: <strong>{order.orderNumber}</strong>
      </Text>
      <Text style={{ marginBottom: '16px' }}>
        📅 Data da compra: <strong>{order.orderDate}</strong>
      </Text>

      <Text style={{ marginBottom: '8px' }}>📦 Itens do pedido:</Text>

      {order.items.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#1A1A1A',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '8px',
          }}
        >
          <p style={{ fontSize: '14px', color: '#FFFFFF', margin: '0 0 4px 0' }}>
            {item.name} – {item.color} – Qnt: {item.quantity} – R${' '}
            {item.price.toFixed(2).replace('.', ',')}
          </p>
        </div>
      ))}

      <Text style={{ marginTop: '16px' }}>
        💳 Total:{' '}
        <strong style={{ fontSize: '18px' }}>
          R$ {order.total.toFixed(2).replace('.', ',')}
        </strong>
      </Text>

      <Text>Você receberá um novo e-mail assim que seu pedido for enviado.</Text>

      <Button href={`https://rosachic.com.br/pedidos/${order.orderNumber}`}>
        Acompanhar pedido
      </Button>
    </EmailLayout>
  )
}
