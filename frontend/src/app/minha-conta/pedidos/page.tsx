'use client'

import { AccountLayout } from '@/components/AccountLayout'
import { Package } from 'lucide-react'

export default function MeusPedidosPage() {
  const pedidos = [
    {
      id: 1,
      produto: 'Persiana Blackout Kitbox - Preto',
      categoria: 'Cortinas',
      cor: 'Preto',
      tamanho: '(1,5m x 2,0m)',
      lado: 'Direito',
      quantidade: 1,
      preco: 350.19,
      status: 'Entregue',
      statusColor: 'bg-green-100 text-green-800',
      imagem: '/product-placeholder.jpg',
      acoes: ['Comprar novamente', 'Avaliar produto', 'Solicitar devolução', 'Ver detalhes']
    },
    {
      id: 2,
      produto: 'Persiana Blackout Kitbox - Preto',
      categoria: 'Cortinas',
      cor: 'Preto',
      tamanho: '(1,5m x 2,0m)',
      lado: 'Direito',
      quantidade: 1,
      preco: 350.19,
      status: 'Pagamento aprovado / Em separação',
      statusColor: 'bg-blue-100 text-blue-800',
      imagem: '/product-placeholder.jpg',
      acoes: ['Cancelar', 'Ver detalhes']
    },
    {
      id: 3,
      produto: 'Persiana Blackout Kitbox - Preto',
      categoria: 'Cortinas',
      cor: 'Preto',
      tamanho: '(1,5m x 2,0m)',
      lado: 'Direito',
      quantidade: 1,
      preco: 350.19,
      status: 'Pagamento pendente',
      statusColor: 'bg-yellow-100 text-yellow-800',
      imagem: '/product-placeholder.jpg',
      acoes: ['Cancelar', 'Ver detalhes']
    },
  ]

  return (
    <AccountLayout>
      <div className="space-y-6">
        <h1 className="font-sans text-2xl font-semibold text-black">
          Meus Pedidos
        </h1>

        {/* Lista de Pedidos */}
        {pedidos.map((pedido) => (
          <div key={pedido.id} className="bg-[rgb(241,237,237)] rounded-lg shadow-sm p-6">
            <div className="flex gap-6">
              {/* Imagem do Produto */}
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                <Package size={48} className="text-gray-400" />
              </div>

              {/* Informações do Pedido */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 font-sans text-xs font-medium rounded-full mb-2">
                      {pedido.categoria}
                    </span>
                    <h3 className="font-sans text-lg font-semibold text-black">
                      {pedido.produto}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 ${pedido.statusColor} font-sans text-xs font-medium rounded-full`}>
                    {pedido.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-sans text-gray-600">Cor: </span>
                    <span className="font-sans text-black font-medium">{pedido.cor}</span>
                  </div>
                  <div>
                    <span className="font-sans text-gray-600">Tamanho: </span>
                    <span className="font-sans text-black font-medium">{pedido.tamanho}</span>
                  </div>
                  <div>
                    <span className="font-sans text-gray-600">Lado da cordinha: </span>
                    <span className="font-sans text-black font-medium">{pedido.lado}</span>
                  </div>
                  <div>
                    <span className="font-sans text-gray-600">Qnt: </span>
                    <span className="font-sans text-black font-medium">{String(pedido.quantidade).padStart(2, '0')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-sans text-xl font-bold text-[rgb(108,25,29)]">
                    R$ {pedido.preco.toFixed(2).replace('.', ',')}
                  </p>

                  <div className="flex gap-3">
                    {pedido.acoes.map((acao, index) => (
                      <button
                        key={index}
                        className={`px-4 py-2 font-sans text-sm font-medium rounded-lg transition-colors ${
                          acao === 'Cancelar'
                            ? 'border border-red-500 text-red-500 hover:bg-red-50'
                            : acao === 'Ver detalhes'
                            ? 'border border-[rgb(108,25,29)] text-[rgb(108,25,29)] hover:bg-[rgb(255,243,243)]'
                            : 'bg-[rgb(108,25,29)] text-white hover:bg-[rgb(88,20,24)]'
                        }`}
                      >
                        {acao}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Paginação */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button className="w-10 h-10 flex items-center justify-center bg-[rgb(108,25,29)] text-white font-sans text-sm font-medium rounded-lg">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-700 font-sans text-sm font-medium rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-700 font-sans text-sm font-medium rounded-lg hover:bg-gray-50">
            3
          </button>
          <span className="px-2 text-gray-500">...</span>
        </div>
      </div>
    </AccountLayout>
  )
}
