import toast from 'react-hot-toast'

/**
 * Toast customizado para Rosa Chic
 * Usa react-hot-toast com estilos personalizados
 */

const toastConfig = {
  duration: 4000,
  style: {
    background: '#fff',
    color: '#333',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}

export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      ...toastConfig,
      icon: '✅',
      style: {
        ...toastConfig.style,
        border: '2px solid rgb(25, 108, 43)',
      },
    })
  },

  error: (message: string) => {
    toast.error(message, {
      ...toastConfig,
      icon: '❌',
      duration: 5000,
      style: {
        ...toastConfig.style,
        border: '2px solid rgb(220, 38, 38)',
      },
    })
  },

  loading: (message: string) => {
    return toast.loading(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        border: '2px solid rgb(108, 25, 29)',
      },
    })
  },

  info: (message: string) => {
    toast(message, {
      ...toastConfig,
      icon: 'ℹ️',
      style: {
        ...toastConfig.style,
        border: '2px solid rgb(59, 130, 246)',
      },
    })
  },

  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    }
  ) => {
    return toast.promise(promise, messages, {
      loading: {
        ...toastConfig,
      },
      success: {
        ...toastConfig,
        style: {
          ...toastConfig.style,
          border: '2px solid rgb(25, 108, 43)',
        },
      },
      error: {
        ...toastConfig,
        duration: 5000,
        style: {
          ...toastConfig.style,
          border: '2px solid rgb(220, 38, 38)',
        },
      },
    })
  },
}

// Função para fechar um toast específico
export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId)
}

// Função para fechar todos os toasts
export const dismissAllToasts = () => {
  toast.dismiss()
}
