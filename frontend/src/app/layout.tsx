import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

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
        {children}
      </body>
    </html>
  )
}