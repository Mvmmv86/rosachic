import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface MainLayoutProps {
  children: ReactNode
  className?: string
}

export function MainLayout({ children, className = '' }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}