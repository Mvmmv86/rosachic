import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rosa Chic Persinas',
  description: 'Sistema de orçamento e vendas de persianas personalizadas',
  keywords: 'persianas, cortinas, decoração, orçamento, rosa chic',
  authors: [{ name: 'Rosa Chic Persinas' }],
  creator: 'Rosa Chic Persinas',
  publisher: 'Rosa Chic Persinas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Rosa Chic Persinas',
    description: 'Sistema de orçamento e vendas de persianas personalizadas',
    siteName: 'Rosa Chic Persinas',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}