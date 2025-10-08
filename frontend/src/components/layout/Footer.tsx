import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Phone, Clock } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    produtos: [
      { name: 'Persinas Horizontais', href: '/persianas/horizontais' },
      { name: 'Persinas Verticais', href: '/persianas/verticais' },
      { name: 'Persinas Rolô', href: '/persianas/rolo' },
      { name: 'Cortinas', href: '/cortinas' },
      { name: 'Toldos', href: '/toldos' },
    ],
    empresa: [
      { name: 'Sobre Nós', href: '/sobre' },
      { name: 'Showroom', href: '/showroom' },
      { name: 'Portfólio', href: '/portfolio' },
      { name: 'Depoimentos', href: '/depoimentos' },
      { name: 'Blog', href: '/blog' },
    ],
    suporte: [
      { name: 'Como Comprar', href: '/como-comprar' },
      { name: 'Medição', href: '/medicao' },
      { name: 'Instalação', href: '/instalacao' },
      { name: 'Garantia', href: '/garantia' },
      { name: 'FAQ', href: '/faq' },
    ],
  }

  return (
    <footer className="bg-brand-dark text-brand-cream">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-h3 font-serif font-bold mb-2">Rosa Chic Persianas</h3>
              <p className="text-body text-brand-neutral-300">
                Elegância e sofisticação para seus ambientes.
                Produtos de alta qualidade com design exclusivo.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brand-neutral-400 mt-0.5" />
                <p className="text-small text-brand-neutral-300">
                  Rua das Flores, 123 - Jardim Primavera<br />
                  São Paulo - SP, 01234-567
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-brand-neutral-400" />
                <p className="text-small text-brand-neutral-300">(11) 98765-4321</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand-neutral-400" />
                <p className="text-small text-brand-neutral-300">contato@rosachicpersianas.com.br</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-brand-neutral-400" />
                <p className="text-small text-brand-neutral-300">
                  Seg-Sex: 9h às 18h | Sáb: 9h às 13h
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com/rosachicpersianas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-neutral-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="https://instagram.com/rosachicpersianas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-neutral-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-body-lg font-semibold mb-4">Produtos</h4>
            <ul className="space-y-2">
              {links.produtos.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-small text-brand-neutral-300 hover:text-brand-cream transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-body-lg font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {links.empresa.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-small text-brand-neutral-300 hover:text-brand-cream transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-body-lg font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2">
              {links.suporte.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-small text-brand-neutral-300 hover:text-brand-cream transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-small text-brand-neutral-400">
              © {currentYear} Rosa Chic Persianas. Todos os direitos reservados.
            </p>

            {/* Legal Links */}
            <div className="flex space-x-6">
              <Link
                href="/privacidade"
                className="text-small text-brand-neutral-400 hover:text-brand-cream transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="/termos"
                className="text-small text-brand-neutral-400 hover:text-brand-cream transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}