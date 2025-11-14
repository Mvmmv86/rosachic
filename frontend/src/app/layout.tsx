import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rosa Chic Persinas - Persianas sob Medida',
  description: 'E-commerce premium de persianas sob medida com qualidade e elegância',
  keywords: 'persianas, cortinas, decoração, orçamento, rosa chic, persianas sob medida',
  authors: [{ name: 'Rosa Chic Persinas' }],
  creator: 'Rosa Chic Persinas',
  publisher: 'Rosa Chic Persinas',
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/favicon.png',
      },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Rosa Chic Persinas - Persianas sob Medida',
    description: 'E-commerce premium de persianas sob medida com qualidade e elegância',
    siteName: 'Rosa Chic Persinas',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
        alt: 'Rosa Chic Persinas Logo',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-brand-cream text-brand-dark">
        <AuthProvider>
          <Toaster position="top-right" />
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}