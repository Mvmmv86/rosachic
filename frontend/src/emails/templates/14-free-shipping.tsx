/**
 * EMAIL 14 - FRETE GRÁTIS (INCENTIVO)
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string (nome do cliente)
 * - product: ProductItem (mesma estrutura do email 12)
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Um presente para você não perder essa compra
 * - Finalize sua compra nas próximas 24h e receba frete grátis.
 * - [Card com detalhes do produto]
 * - Botão: "Aproveitar agora"
 */

import React from 'react'
import {
  EmailLayout,
  Greeting,
  Title,
  Text,
  Button,
  ProductCard,
} from '../components/EmailLayout'
import { Email14FreeShippingProps } from '../types'

export function Email14FreeShipping({ customerName, product }: Email14FreeShippingProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Um presente para você não perder essa compra</Title>

      <Text>Finalize sua compra nas próximas 24h e receba frete grátis.</Text>

      <ProductCard product={product} />

      <Button href="https://rosachic.com.br/carrinho">Aproveitar agora</Button>
    </EmailLayout>
  )
}
