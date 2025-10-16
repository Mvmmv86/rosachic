'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Lock } from 'lucide-react'
import {
  validateCardNumber,
  validateCVV,
  validateExpiryDate,
  detectCardBrand,
  formatCardNumber,
  formatExpiryDate,
  formatCVV,
  getBrandName,
  getBrandColor,
  type CardBrand,
} from '@/lib/card-validator'

interface CreditCardFormProps {
  onValidCard?: (data: CardData) => void
  onInvalidCard?: () => void
}

export interface CardData {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
  brand: CardBrand
}

export function CreditCardForm({ onValidCard, onInvalidCard }: CreditCardFormProps) {
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [brand, setBrand] = useState<CardBrand>('unknown')

  const [errors, setErrors] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  })

  // Detectar bandeira automaticamente
  useEffect(() => {
    const detectedBrand = detectCardBrand(cardNumber)
    setBrand(detectedBrand)
  }, [cardNumber])

  // Validar em tempo real e notificar parent
  useEffect(() => {
    const isCardNumberValid = validateCardNumber(cardNumber)
    const isCvvValid = validateCVV(cvv, brand)
    const isExpiryValid = validateExpiryDate(expiryDate)
    const isHolderValid = cardHolder.trim().length >= 3

    if (isCardNumberValid && isCvvValid && isExpiryValid && isHolderValid) {
      onValidCard?.({
        cardNumber: cardNumber.replace(/\D/g, ''),
        cardHolder,
        expiryDate,
        cvv,
        brand,
      })
    } else {
      onInvalidCard?.()
    }
  }, [cardNumber, cardHolder, expiryDate, cvv, brand, onValidCard, onInvalidCard])

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value)
    setCardNumber(formatted)

    // Validar
    if (value.length > 0) {
      const cleaned = value.replace(/\D/g, '')
      if (cleaned.length >= 13) {
        const isValid = validateCardNumber(value)
        setErrors({
          ...errors,
          cardNumber: isValid ? '' : 'Número do cartão inválido',
        })
      }
    }
  }

  const handleExpiryChange = (value: string) => {
    const formatted = formatExpiryDate(value)
    setExpiryDate(formatted)

    // Validar
    if (value.length >= 4) {
      const isValid = validateExpiryDate(value)
      setErrors({
        ...errors,
        expiryDate: isValid ? '' : 'Data inválida ou cartão expirado',
      })
    }
  }

  const handleCvvChange = (value: string) => {
    const formatted = formatCVV(value, brand)
    setCvv(formatted)

    // Validar
    const expectedLength = brand === 'amex' ? 4 : 3
    if (value.length > 0) {
      const isValid = validateCVV(value, brand)
      setErrors({
        ...errors,
        cvv: isValid ? '' : `CVV deve ter ${expectedLength} dígitos`,
      })
    }
  }

  const handleHolderChange = (value: string) => {
    // Apenas letras e espaços
    const cleaned = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase()
    setCardHolder(cleaned)

    if (value.length > 0) {
      setErrors({
        ...errors,
        cardHolder: cleaned.length < 3 ? 'Nome muito curto' : '',
      })
    }
  }

  return (
    <div className="w-full space-y-6">
      {/* Card Preview */}
      <div
        className="w-full h-48 rounded-xl p-6 text-white relative overflow-hidden shadow-lg"
        style={{ backgroundColor: getBrandColor(brand) }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>

        {/* Chip */}
        <div className="relative z-10">
          <div className="w-12 h-10 bg-yellow-400 rounded-md mb-4 flex items-center justify-center">
            <div className="w-8 h-6 border-2 border-yellow-600 rounded"></div>
          </div>

          {/* Card Number */}
          <div className="text-xl font-mono tracking-wider mb-4">
            {cardNumber || '•••• •••• •••• ••••'}
          </div>

          {/* Holder and Expiry */}
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs opacity-70 mb-1">Nome do Titular</div>
              <div className="text-sm font-medium">
                {cardHolder || 'SEU NOME AQUI'}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs opacity-70 mb-1">Validade</div>
              <div className="text-sm font-medium">
                {expiryDate || 'MM/AA'}
              </div>
            </div>
          </div>
        </div>

        {/* Brand logo */}
        {brand !== 'unknown' && (
          <div className="absolute top-6 right-6 text-sm font-bold opacity-90">
            {getBrandName(brand)}
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número do Cartão *
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => handleCardNumberChange(e.target.value)}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              className={`w-full px-4 py-3 pl-12 border rounded-lg text-base focus:outline-none focus:ring-2 ${
                errors.cardNumber
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-[rgb(108,25,29)]'
              }`}
            />
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            {brand !== 'unknown' && (
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded text-xs font-bold text-white"
                style={{ backgroundColor: getBrandColor(brand) }}
              >
                {getBrandName(brand)}
              </div>
            )}
          </div>
          {errors.cardNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
          )}
        </div>

        {/* Card Holder */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Titular (como está no cartão) *
          </label>
          <input
            type="text"
            value={cardHolder}
            onChange={(e) => handleHolderChange(e.target.value)}
            placeholder="NOME COMPLETO"
            className={`w-full px-4 py-3 border rounded-lg text-base uppercase focus:outline-none focus:ring-2 ${
              errors.cardHolder
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300 focus:ring-[rgb(108,25,29)]'
            }`}
          />
          {errors.cardHolder && (
            <p className="mt-1 text-sm text-red-600">{errors.cardHolder}</p>
          )}
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-2 gap-4">
          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Validade *
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => handleExpiryChange(e.target.value)}
              placeholder="MM/AA"
              maxLength={5}
              className={`w-full px-4 py-3 border rounded-lg text-base focus:outline-none focus:ring-2 ${
                errors.expiryDate
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-[rgb(108,25,29)]'
              }`}
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
            )}
          </div>

          {/* CVV */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV *
            </label>
            <div className="relative">
              <input
                type="text"
                value={cvv}
                onChange={(e) => handleCvvChange(e.target.value)}
                placeholder={brand === 'amex' ? '0000' : '000'}
                maxLength={brand === 'amex' ? 4 : 3}
                className={`w-full px-4 py-3 pl-12 border rounded-lg text-base focus:outline-none focus:ring-2 ${
                  errors.cvv
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-[rgb(108,25,29)]'
                }`}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {errors.cvv && (
              <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
            )}
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-900">
            Pagamento Seguro
          </span>
        </div>
        <p className="text-xs text-green-800">
          Seus dados são protegidos com criptografia SSL de ponta a ponta.
          Nunca armazenamos informações completas do seu cartão.
        </p>
      </div>
    </div>
  )
}
