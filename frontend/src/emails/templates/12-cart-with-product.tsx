/**
 * EMAIL 12 - CARRINHO ABANDONADO COM PRODUTO
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string (nome do cliente)
 * - product: ProductItem {
 *     name: string (ex: "Persiana Blackout Kitbox - Preto")
 *     category: string (ex: "Cortinas")
 *     color: string (ex: "Preto")
 *     width: number (em metros, ex: 2.5)
 *     height: number (em metros, ex: 1.8)
 *     cordSide: "Direito" | "Esquerdo"
 *     quantity: number (ex: 1)
 *     price: number (ex: 350.19)
 *   }
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Seu ambiente pode ficar ainda mais elegante
 * - Notamos que você deixou estes itens reservados:
 * - [Card com detalhes do produto]
 * - Botão: "Finalizar compra"
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
import { Email12CartWithProductProps } from '../types'

export function Email12CartWithProduct({
  customerName,
  product,
}: Email12CartWithProductProps) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Seu ambiente pode ficar ainda mais elegante</Title>

      <Text>Notamos que você deixou estes itens reservados:</Text>

      <ProductCard product={product} />

      <Button href="https://rosachic.com.br/carrinho">Finalizar compra</Button>
    </EmailLayout>
  )
}
