import { Suspense } from 'react'
import { ProductsPageClient } from './ProductsPageClient'

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[rgb(247,243,239)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(108,25,29)] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    }>
      <ProductsPageClient />
    </Suspense>
  )
}
