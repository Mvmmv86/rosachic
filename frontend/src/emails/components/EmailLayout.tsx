/**
 * COMPONENTE BASE - EMAIL LAYOUT
 *
 * Layout base para todos os emails da Rosa Chic
 * - Background preto (#000000)
 * - Fonte Inter
 * - Container centralizado
 */

import React from 'react'

interface EmailLayoutProps {
  children: React.ReactNode
}

export function EmailLayout({ children }: EmailLayoutProps) {
  return (
    <html>
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#000000',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <table
          role="presentation"
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#000000',
          }}
        >
          <tr>
            <td align="center" style={{ padding: '40px 20px' }}>
              {/* Container principal com max-width */}
              <table
                role="presentation"
                style={{
                  maxWidth: '600px',
                  width: '100%',
                  borderCollapse: 'collapse',
                  backgroundColor: '#000000',
                }}
              >
                <tr>
                  <td style={{ padding: '0' }}>
                    {/* Logo */}
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                      <img
                        src="https://via.placeholder.com/100x100/6C191D/FFFFFF?text=RC"
                        alt="Rosa Chic"
                        style={{
                          width: '100px',
                          height: '100px',
                          borderRadius: '50%',
                        }}
                      />
                    </div>

                    {/* Conteúdo do email */}
                    {children}

                    {/* Footer */}
                    <div
                      style={{
                        marginTop: '48px',
                        paddingTop: '24px',
                        borderTop: '1px solid #333333',
                        textAlign: 'center',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '14px',
                          color: '#666666',
                          margin: '0 0 8px 0',
                        }}
                      >
                        Rosa Chic - Persianas de Qualidade
                      </p>
                      <p
                        style={{
                          fontSize: '12px',
                          color: '#666666',
                          margin: '0',
                        }}
                      >
                        © 2025 Rosa Chic. Todos os direitos reservados.
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  )
}

/**
 * COMPONENTE: SAUDAÇÃO
 * Exibe "Olá, {NAME}"
 */
interface GreetingProps {
  /** VARIÁVEL DINÂMICA: Nome do cliente */
  name: string
}

export function Greeting({ name }: GreetingProps) {
  return (
    <p
      style={{
        fontSize: '18px',
        fontWeight: 500,
        color: '#FFFFFF',
        margin: '0 0 16px 0',
      }}
    >
      Olá, {name}
    </p>
  )
}

/**
 * COMPONENTE: TÍTULO
 * Título principal do email
 */
interface TitleProps {
  children: React.ReactNode
}

export function Title({ children }: TitleProps) {
  return (
    <h1
      style={{
        fontSize: '18px',
        fontWeight: 400,
        color: '#FFFFFF',
        margin: '0 0 16px 0',
        lineHeight: '1.5',
      }}
    >
      {children}
    </h1>
  )
}

/**
 * COMPONENTE: TEXTO
 * Corpo do texto do email
 */
interface TextProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export function Text({ children, style }: TextProps) {
  return (
    <p
      style={{
        fontSize: '16px',
        fontWeight: 400,
        color: '#FFFFFF',
        margin: '0 0 24px 0',
        lineHeight: '1.6',
        ...style,
      }}
    >
      {children}
    </p>
  )
}

/**
 * COMPONENTE: BOTÃO
 * Botão de call-to-action
 */
interface ButtonProps {
  href: string
  children: React.ReactNode
}

export function Button({ href, children }: ButtonProps) {
  return (
    <div style={{ textAlign: 'center', margin: '32px 0' }}>
      <a
        href={href}
        style={{
          display: 'inline-block',
          padding: '14px 32px',
          backgroundColor: '#6C191D',
          color: '#F1EDED',
          fontSize: '16px',
          fontWeight: 400,
          textDecoration: 'none',
          borderRadius: '8px',
        }}
      >
        {children}
      </a>
    </div>
  )
}

/**
 * COMPONENTE: CARD DE PRODUTO
 * Exibe detalhes de um produto (para emails de carrinho abandonado)
 */
interface ProductCardProps {
  /** VARIÁVEL DINÂMICA: Dados do produto */
  product: {
    category: string
    name: string
    color: string
    width: number
    height: number
    cordSide: string
    quantity: number
    price: number
    imageUrl?: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      style={{
        backgroundColor: '#1A1A1A',
        borderRadius: '8px',
        padding: '16px',
        margin: '24px 0',
      }}
    >
      {/* Categoria badge */}
      <div style={{ marginBottom: '12px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            backgroundColor: '#6C191D',
            color: '#FFF3F3',
            fontSize: '14px',
            borderRadius: '4px',
          }}
        >
          {product.category}
        </span>
      </div>

      {/* Nome do produto */}
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 400,
          color: '#FFFFFF',
          margin: '0 0 12px 0',
        }}
      >
        {product.name}
      </h3>

      {/* Especificações */}
      <table style={{ width: '100%', marginBottom: '12px' }}>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#625656' }}>Cor: </span>
            <span style={{ fontSize: '14px', color: '#FFFFFF' }}>{product.color}</span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#625656' }}>Tamanho: </span>
            <span style={{ fontSize: '14px', color: '#FFFFFF' }}>
              ({product.width.toFixed(1)}m x {product.height.toFixed(1)}m)
            </span>
          </td>
        </tr>
        <tr>
          <td style={{ paddingBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#625656' }}>Lado da cordinha: </span>
            <span style={{ fontSize: '14px', color: '#FFFFFF' }}>{product.cordSide}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                border: '1px solid #333333',
                borderRadius: '4px',
                fontSize: '14px',
                color: '#FFFFFF',
              }}
            >
              Qnt: {String(product.quantity).padStart(2, '0')}
            </span>
          </td>
        </tr>
      </table>

      {/* Preço */}
      <p
        style={{
          fontSize: '16px',
          fontWeight: 500,
          color: '#FFFFFF',
          margin: '16px 0 0 0',
        }}
      >
        R$ {product.price.toFixed(2).replace('.', ',')}
      </p>
    </div>
  )
}
