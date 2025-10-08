import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Product } from '@/types/product'

// Simplificado temporariamente - será expandido depois
export interface CartItem {
  id: string
  product: Product
  widthCm: number
  heightCm: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    immer((set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const id = crypto.randomUUID()
          state.items.push({ ...item, id })
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
            item.quantity = quantity
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
          (total, item) => total + (item.product.valorM2 || 0) * item.quantity,
          0
        )
      },
    })),
    {
      name: 'cart-storage',
    }
  )
)
