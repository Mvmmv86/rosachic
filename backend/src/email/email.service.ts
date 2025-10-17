import { Injectable, Logger } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)
  private transporter: nodemailer.Transporter

  constructor(private configService: ConfigService) {
    // Configurar transporter do Nodemailer
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST') || 'smtp.gmail.com',
      port: parseInt(this.configService.get('SMTP_PORT') || '587'),
      secure: false, // true para 465, false para outros
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    })

    // Verificar conexão
    this.transporter.verify((error) => {
      if (error) {
        this.logger.warn('⚠️  SMTP não configurado. E-mails não serão enviados.')
        this.logger.warn('Configure SMTP_HOST, SMTP_USER e SMTP_PASS no .env')
      } else {
        this.logger.log('✅ SMTP configurado e pronto para enviar e-mails')
      }
    })
  }

  /**
   * Método genérico para enviar e-mail
   */
  async sendEmail(to: string, subject: string, html: string) {
    try {
      const from = this.configService.get('SMTP_FROM') || 'Rosa Chic <noreply@rosachic.com.br>'

      const info = await this.transporter.sendMail({
        from,
        to,
        subject,
        html,
      })

      this.logger.log(`📧 E-mail enviado para ${to}: ${subject}`)
      this.logger.debug(`   MessageID: ${info.messageId} | Response: ${info.response}`)
      return info
    } catch (error) {
      this.logger.error(`❌ Erro ao enviar e-mail para ${to}:`, error.message || error)
      // Não lançar erro para não quebrar o fluxo principal
      return null
    }
  }

  /**
   * E-mail 1: Boas-vindas (Cadastro)
   */
  async sendWelcome(user: any) {
    const subject = 'Bem-vindo à Rosa Chic!'

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: rgb(108,25,29); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .button { background: rgb(108,25,29); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; }
            .feature { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid rgb(108,25,29); }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Bem-vindo à Rosa Chic! 🎉</h1>
            </div>
            <div class="content">
              <h2>Olá, ${user.name}!</h2>
              <p>Estamos muito felizes em ter você conosco!</p>

              <p>A Rosa Chic é especialista em persianas sob medida, combinando qualidade, elegância e funcionalidade para transformar seus ambientes.</p>

              <h3>O que você pode fazer agora:</h3>

              <div class="feature">
                <strong>🛍️ Explorar Produtos</strong><br>
                Navegue por nossa coleção de persianas exclusivas e encontre a perfeita para seu espaço.
              </div>

              <div class="feature">
                <strong>📏 Calcular Orçamento</strong><br>
                Use nossa calculadora online e descubra o valor ideal para suas medidas.
              </div>

              <div class="feature">
                <strong>💬 Falar com Especialista</strong><br>
                Tire suas dúvidas pelo WhatsApp e receba orientação personalizada.
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="${this.configService.get('FRONTEND_URL')}/produtos" class="button">
                  Ver Produtos
                </a>
              </div>

              <p style="margin-top: 30px; font-size: 12px; color: #666;">
                Aproveite e favorite seus produtos preferidos para não perder de vista! ❤️
              </p>

              <p style="margin-top: 20px;">
                Atenciosamente,<br>
                <strong>Equipe Rosa Chic</strong>
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail(user.email, subject, html)
  }

  /**
   * E-mail 15: Pedido Confirmado
   */
  async sendOrderConfirmed(order: any) {
    const subject = `Pedido #${order.id.slice(0, 8)} Confirmado - Rosa Chic`

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: rgb(108,25,29); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .order-item { border-bottom: 1px solid #ddd; padding: 15px 0; }
            .total { font-size: 24px; font-weight: bold; color: rgb(108,25,29); }
            .button { background: rgb(108,25,29); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Pedido Confirmado! 🎉</h1>
            </div>
            <div class="content">
              <h2>Olá, ${order.user.name}!</h2>
              <p>Recebemos seu pedido e já estamos preparando tudo com carinho.</p>

              <h3>Detalhes do Pedido #${order.id.slice(0, 8)}</h3>

              ${order.items.map((item: any) => `
                <div class="order-item">
                  <strong>${item.product.modelo}</strong><br>
                  Dimensões: ${item.widthCm}cm x ${item.heightCm}cm<br>
                  Quantidade: ${item.quantity}<br>
                  Subtotal: R$ ${item.subtotal.toFixed(2)}
                </div>
              `).join('')}

              <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 8px;">
                <p><strong>Subtotal:</strong> R$ ${order.subtotal.toFixed(2)}</p>
                <p><strong>Frete:</strong> ${order.frete === 0 ? 'Grátis' : 'R$ ' + order.frete.toFixed(2)}</p>
                <p class="total">Total: R$ ${order.total.toFixed(2)}</p>
              </div>

              <h3>Endereço de Entrega</h3>
              <p>
                ${order.shipping.recipientName}<br>
                ${order.shipping.street}, ${order.shipping.number}
                ${order.shipping.complement ? ' - ' + order.shipping.complement : ''}<br>
                ${order.shipping.neighborhood} - ${order.shipping.city}/${order.shipping.state}<br>
                CEP: ${order.shipping.zipCode}
              </p>

              <div style="text-align: center; margin-top: 30px;">
                <a href="${this.configService.get('FRONTEND_URL')}/minha-conta/pedidos" class="button">
                  Acompanhar Pedido
                </a>
              </div>

              <p style="margin-top: 30px; font-size: 12px; color: #666;">
                Você receberá atualizações sobre seu pedido por e-mail.<br>
                Prazo de entrega: até 7 dias úteis.
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail(order.user.email, subject, html)
  }

  /**
   * E-mail 16: Pedido Enviado
   */
  async sendOrderShipped(order: any, trackingCode?: string) {
    const subject = `Pedido #${order.id.slice(0, 8)} Enviado! 📦`

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: rgb(108,25,29); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .tracking { background: #fff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .tracking-code { font-size: 24px; font-weight: bold; color: rgb(108,25,29); margin: 10px 0; }
            .button { background: rgb(108,25,29); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Seu Pedido Foi Enviado! 🚚</h1>
            </div>
            <div class="content">
              <h2>Olá, ${order.user.name}!</h2>
              <p>Ótimas notícias! Seu pedido #${order.id.slice(0, 8)} já saiu para entrega.</p>

              ${trackingCode ? `
                <div class="tracking">
                  <p>Código de Rastreamento:</p>
                  <div class="tracking-code">${trackingCode}</div>
                  <p style="font-size: 12px; color: #666;">
                    Acompanhe sua entrega pelos Correios
                  </p>
                </div>
              ` : ''}

              <p>
                Você receberá seu pedido em breve. Fique atento ao endereço de entrega:<br>
                <strong>${order.shipping.street}, ${order.shipping.number} - ${order.shipping.city}/${order.shipping.state}</strong>
              </p>

              <div style="text-align: center; margin-top: 30px;">
                <a href="${this.configService.get('FRONTEND_URL')}/minha-conta/pedidos/${order.id}" class="button">
                  Ver Detalhes do Pedido
                </a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail(order.user.email, subject, html)
  }

  /**
   * E-mail 17: Pedido Entregue
   */
  async sendOrderDelivered(order: any) {
    const subject = `Pedido #${order.id.slice(0, 8)} Entregue! ✅`

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: rgb(25,108,43); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .button { background: rgb(108,25,29); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Pedido Entregue! 🎊</h1>
            </div>
            <div class="content">
              <h2>Olá, ${order.user.name}!</h2>
              <p>Seu pedido #${order.id.slice(0, 8)} foi entregue com sucesso!</p>

              <p>Esperamos que você adore suas novas persianas Rosa Chic. ✨</p>

              <h3>Gostou da sua compra?</h3>
              <p>Sua opinião é muito importante para nós!</p>

              <div style="text-align: center; margin-top: 30px;">
                <a href="${this.configService.get('FRONTEND_URL')}/minha-conta/pedidos/${order.id}" class="button">
                  Avaliar Produtos
                </a>
                <a href="${this.configService.get('FRONTEND_URL')}/produtos" class="button" style="background: #666;">
                  Ver Mais Produtos
                </a>
              </div>

              <p style="margin-top: 30px; font-size: 12px; color: #666;">
                Obrigado por escolher a Rosa Chic! ❤️
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail(order.user.email, subject, html)
  }

  /**
   * E-mail 23: Reset de Senha
   */
  async sendPasswordReset(user: any, resetToken: string) {
    const subject = 'Recuperação de Senha - Rosa Chic'
    const resetLink = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${resetToken}`

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: rgb(108,25,29); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .button { background: rgb(108,25,29); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; }
            .warning { background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔑 Recuperação de Senha</h1>
            </div>
            <div class="content">
              <h2>Olá, ${user.name}!</h2>
              <p>Recebemos uma solicitação para redefinir sua senha.</p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" class="button">
                  Redefinir Senha
                </a>
              </div>

              <div class="warning">
                <strong>⚠️ Atenção:</strong><br>
                Este link expira em <strong>1 hora</strong>.<br>
                Se você não solicitou esta alteração, ignore este e-mail.
              </div>

              <p style="font-size: 12px; color: #666;">
                Ou copie e cole este link no navegador:<br>
                <code style="background: #e9ecef; padding: 5px; border-radius: 4px;">${resetLink}</code>
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail(user.email, subject, html)
  }

  /**
   * E-mail 24: Senha Alterada
   */
  async sendPasswordChanged(user: any) {
    const subject = 'Senha Alterada com Sucesso - Rosa Chic'

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: rgb(25,108,43); color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .info { background: #d1ecf1; border: 1px solid #0c5460; padding: 15px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Senha Alterada</h1>
            </div>
            <div class="content">
              <h2>Olá, ${user.name}!</h2>
              <p>Sua senha foi alterada com sucesso.</p>

              <div class="info">
                <strong>ℹ️ Informação:</strong><br>
                Data: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}<br>
                <br>
                Se você não fez esta alteração, entre em contato conosco imediatamente.
              </div>

              <p>
                Para sua segurança, faça login novamente em todos os seus dispositivos.
              </p>

              <p style="margin-top: 30px;">
                Atenciosamente,<br>
                <strong>Equipe Rosa Chic</strong>
              </p>
            </div>
          </div>
        </body>
      </html>
    `

    return this.sendEmail(user.email, subject, html)
  }
}