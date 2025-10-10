/**
 * EMAIL 13 - ÚLTIMA CHANCE (URGÊNCIA)
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string (nome do cliente)
 * - product: ProductItem (mesma estrutura do email 12)
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Seu carrinho está quase acabando
 * - Atenção! Seus itens podem não estar disponíveis por muito tempo.
 * - [Card com detalhes do produto]
 * - Botão: "Concluir Pedido"
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
import { Email13LastChanceProps } from '../types'

export function Email13LastChance({ customerName, product }: Email13LastChanceProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Seu carrinho está quase acabando</Title>

      <Text>Atenção! Seus itens podem não estar disponíveis por muito tempo.</Text>

      <ProductCard product={product} />

      <Button href="https://rosachic.com.br/carrinho">Concluir Pedido</Button>
    </EmailLayout>
  )
}
