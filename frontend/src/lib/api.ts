import axios from 'axios'

// Detectar automaticamente a URL da API em produção
const getApiUrl = () => {
  // Se a variável de ambiente estiver definida, usar ela
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
  }

  // Em produção (Railway), usar URL do backend
  if (typeof window !== 'undefined' && window.location.hostname.includes('railway.app')) {
    return 'https://rosachic-production.up.railway.app'
  }

  // Em desenvolvimento, usar localhost
  return 'http://localhost:3001'
}

const API_URL = getApiUrl()

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para adicionar token se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    return Promise.reject(error)
  }
)
