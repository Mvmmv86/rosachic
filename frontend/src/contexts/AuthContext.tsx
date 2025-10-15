'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api } from '@/lib/api'

interface User {
  id: string
  email: string
  name: string
  phone?: string
  cpf?: string
  birthDate?: string
  gender?: string
  role: 'USER' | 'ADMIN'
}

interface AuthContextData {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  updateProfile: (data: UpdateProfileData) => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  name: string
  phone?: string
  cpf?: string
}

interface UpdateProfileData {
  name?: string
  phone?: string
  cpf?: string
  birthDate?: string
  gender?: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar usuário ao iniciar
  useEffect(() => {
    loadUserFromStorage()
  }, [])

  async function loadUserFromStorage() {
    try {
      const token = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')

      if (token && storedUser) {
        setUser(JSON.parse(storedUser))

        // Validar token buscando dados atualizados
        try {
          const { data } = await api.get('/auth/me')
          setUser(data)
          localStorage.setItem('user', JSON.stringify(data))
        } catch (error) {
          // Token inválido, limpar storage
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          setUser(null)
        }
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function login(email: string, password: string) {
    try {
      const { data } = await api.post('/auth/login', { email, password })

      // O backend retorna "token" e não "access_token"
      const { token, user: userData } = data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao fazer login'
      throw new Error(message)
    }
  }

  async function register(registerData: RegisterData) {
    try {
      const { data } = await api.post('/auth/register', registerData)

      // O backend retorna "token" e não "access_token"
      const { token, user: userData } = data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao criar conta'
      throw new Error(message)
    }
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  async function updateProfile(updateData: UpdateProfileData) {
    try {
      const { data } = await api.put('/users/me', updateData)

      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
    } catch (error: any) {
      const message = error.response?.data?.message || 'Erro ao atualizar perfil'
      throw new Error(message)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}