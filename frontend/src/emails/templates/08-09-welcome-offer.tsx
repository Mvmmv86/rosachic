/**
 * EMAIL 08 e 09 - OFERTA DE BOAS-VINDAS (com variação de botão)
 *
 * VARIÁVEIS DINÂMICAS NECESSÁRIAS:
 * - customerName: string (nome do cliente)
 * - couponCode: string (código do cupom - ex: "ROSACHIC10")
 * - discountPercentage: number (percentual de desconto - ex: 10)
 *
 * TEXTOS:
 * - Olá, {customerName}
 * - Seu desconto exclusivo de boas-vindas
 * - Como forma de agradecer, aqui vai um cupom especial:
 *   CUPOM: {couponCode} – {discountPercentage}% OFF na sua primeira compra.
 * - Botão (versão 1): "Descubra os diferenciais"
 * - Botão (versão 2): "Usar meu cupom"
 */

import React from 'react'
import { EmailLayout, Greeting, Title, Text, Button } from '../components/EmailLayout'
import { Email08_09WelcomeOfferProps } from '../types'

interface Email08_09Props extends Email08_09WelcomeOfferProps {
  buttonText?: 'diferenciais' | 'cupom'
}

export function Email08_09WelcomeOffer({
  customerName,
  couponCode,
  discountPercentage,
  buttonText = 'cupom',
}: Email08_09Props) {
  return (
    <EmailLayout>
      <Greeting name={customerName} />

      <Title>Seu desconto exclusivo de boas-vindas</Title>

      <Text>
        Como forma de agradecer, aqui vai um cupom especial:{' '}
        <strong>
          CUPOM: {couponCode} – {discountPercentage}% OFF
        </strong>{' '}
        na sua primeira compra.
      </Text>

      <Button
        href={
          buttonText === 'cupom'
            ? 'https://rosachic.com.br/carrinho'
            : 'https://rosachic.com.br/diferenciais'
        }
      >
        {buttonText === 'cupom' ? 'Usar meu cupom' : 'Descubra os diferenciais'}
      </Button>
    </EmailLayout>
  )
}
