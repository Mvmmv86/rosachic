import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Product } from '@/types/product'
import type { PricingResult } from '@/lib/pricing/calculations'

export interface CartItem {
  id: string
  product: Product
  widthCm: number
  heightCm: number
  pricing: PricingResult
  quantity: number

  // Opcionais selecionados
  options: {
    bando: boolean
    motor: boolean
    installation: boolean
  }

  // Timestamp para ordenação
  addedAt: string
}

interface CartStore {
  items: CartItem[]

  // Ações principais
  addItem: (item: Omit<CartItem, 'id' | 'addedAt'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void

  // Getters computados
  getTotalItems: () => number
  getTotalPrice: () => number
  getSubtotal: () => number
  getTotalDiscount: () => number

  // Ações auxiliares
  findItem: (productId: string, widthCm: number, heightCm: number) => CartItem | undefined
  isInCart: (productId: string, widthCm: number, heightCm: number) => boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    immer((set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          // Verificar se já existe item similar
          const existingItem = state.items.find(
            (i) =>
              i.product.id === item.product.id &&
              i.widthCm === item.widthCm &&
              i.heightCm === item.heightCm &&
              i.options.bando === item.options.bando &&
              i.options.motor === item.options.motor
          )

          if (existingItem) {
            // Se já existe, apenas incrementa quantidade
            existingItem.quantity += item.quantity
          } else {
            // Se não existe, adiciona novo item
            const id = crypto.randomUUID()
            const addedAt = new Date().toISOString()
            state.items.push({ ...item, id, addedAt })
          }
        })
      },

      removeItem: (id) => {
        set((state) => {
          state.items = state.items.filter((item) => item.id !== id)
        })
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          const item = state.items.find((item) => item.id === id)
          if (item) {
            // Se quantidade for 0 ou menor, remove o item
            if (quantity <= 0) {
              state.items = state.items.filter((item) => item.id !== id)
            } else {
              item.quantity = quantity
            }
          }
        })
      },

      clearCart: () => {
        set((state) => {
          state.items = []
        })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.pricing.totalFinal * item.quantity,
          0
        )
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.pricing.subtotal * item.quantity,
          0
        )
      },

      getTotalDiscount: () => {
        return get().items.reduce(
          (total, item) => total + item.pricing.desconto * item.quantity,
          0
        )
      },

      findItem: (productId, widthCm, heightCm) => {
        return get().items.find(
          (item) =>
            item.product.id === productId &&
            item.widthCm === widthCm &&
            item.heightCm === heightCm
        )
      },

      isInCart: (productId, widthCm, heightCm) => {
        return !!get().findItem(productId, widthCm, heightCm)
      },
    })),
    {
      name: 'rosa-chic-cart',
      version: 1,
      // Configuração para não persistir dados sensíveis
      partialize: (state) => ({
        items: state.items.map(item => ({
          ...item,
          // Remove dados sensíveis do produto ao persistir
          product: {
            id: item.product.id,
            codigo: item.product.codigo,
            modelo: item.product.modelo,
            luminosidade: item.product.luminosidade,
            material: item.product.material,
            valorM2: item.product.valorM2,
            larguraMaxCm: item.product.larguraMaxCm,
            alturaMaxCm: item.product.alturaMaxCm,
            restricoes: item.product.restricoes,
            imagens: item.product.imagens,
            descricao: item.product.descricao,
            estoque: item.product.estoque,
            ativo: item.product.ativo,
            createdAt: item.product.createdAt,
            updatedAt: item.product.updatedAt,
          }
        }))
      }),
    }
  )
)