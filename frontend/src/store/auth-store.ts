// Store temporária para autenticação - será substituída na Task 1.9
import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  role: 'USER' | 'ADMIN'
}

interface AuthStore {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
  isAuthenticated: () => boolean
  isAdmin: () => boolean
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,

  setAuth: (user, token) => {
    set({ user, token })
  },

  logout: () => {
    set({ user: null, token: null })
  },

  isAuthenticated: () => {
    return get().token !== null
  },

  isAdmin: () => {
    return get().user?.role === 'ADMIN'
  }
}))