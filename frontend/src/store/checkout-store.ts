import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CheckoutAddress {
  id?: string
  cep: string
  rua: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
}

interface CheckoutStore {
  // Dados do checkout
  address: CheckoutAddress | null
  paymentMethod: string | null

  // Ações
  setAddress: (address: CheckoutAddress) => void
  setPaymentMethod: (method: string) => void
  clearCheckout: () => void

  // Getters
  hasAddress: () => boolean
  hasPaymentMethod: () => boolean
  isComplete: () => boolean
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set, get) => ({
      address: null,
      paymentMethod: null,

      setAddress: (address) => {
        set({ address })
      },

      setPaymentMethod: (method) => {
        set({ paymentMethod: method })
      },

      clearCheckout: () => {
        set({ address: null, paymentMethod: null })
      },

      hasAddress: () => {
        const { address } = get()
        return address !== null &&
          !!address.cep &&
          !!address.rua &&
          !!address.numero &&
          !!address.bairro &&
          !!address.cidade &&
          !!address.estado
      },

      hasPaymentMethod: () => {
        return get().paymentMethod !== null
      },

      isComplete: () => {
        return get().hasAddress() && get().hasPaymentMethod()
      },
    }),
    {
      name: 'rosa-chic-checkout',
      version: 1,
    }
  )
)
