require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('🧪 Testando configuração de email...\n');

  // Mostrar configurações (sem senha completa)
  console.log('📋 Configurações atuais:');
  console.log(`SMTP_HOST: ${process.env.SMTP_HOST}`);
  console.log(`SMTP_PORT: ${process.env.SMTP_PORT}`);
  console.log(`SMTP_USER: ${process.env.SMTP_USER}`);
  console.log(`SMTP_PASS: ${process.env.SMTP_PASS ? '***' + process.env.SMTP_PASS.slice(-4) : 'NÃO DEFINIDA'}`);
  console.log(`SMTP_FROM: ${process.env.SMTP_FROM}\n`);

  try {
    // Criar transporter
    console.log('🔧 Criando transporter...');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true, // Ativar debug
      logger: true  // Ativar logs
    });

    // Verificar conexão
    console.log('🔌 Verificando conexão com SMTP...');
    await transporter.verify();
    console.log('✅ Conexão verificada com sucesso!\n');

    // Enviar email de teste
    console.log('📧 Enviando email de teste...');
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || 'Rosa Chic <noreply@rosachic.com.br>',
      to: 'teste@example.com',
      subject: '🧪 Teste de Email - Rosa Chic',
      html: `
        <h1>Email de Teste</h1>
        <p>Se você está vendo isso, o sistema está funcionando!</p>
        <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
      `
    });

    console.log('\n✅ Email enviado com sucesso!');
    console.log(`📬 Message ID: ${info.messageId}`);
    console.log(`📨 Response: ${info.response}`);
    console.log(`📊 Accepted: ${info.accepted}`);
    console.log(`❌ Rejected: ${info.rejected}`);

    if (info.envelope) {
      console.log(`📮 Envelope:`);
      console.log(`   From: ${info.envelope.from}`);
      console.log(`   To: ${info.envelope.to}`);
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('🎉 TESTE CONCLUÍDO COM SUCESSO!');
    console.log('Agora verifique se o email apareceu no Mailtrap.');
    console.log('═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ ERRO NO TESTE:');
    console.error(`Tipo: ${error.name}`);
    console.error(`Mensagem: ${error.message}`);
    if (error.code) {
      console.error(`Código: ${error.code}`);
    }
    if (error.command) {
      console.error(`Comando: ${error.command}`);
    }
    console.error('\n📋 Possíveis causas:');
    console.error('  1. Credenciais do Mailtrap incorretas ou expiradas');
    console.error('  2. Firewall bloqueando porta 2525');
    console.error('  3. Host ou porta incorretos');
    console.error('  4. Conta Mailtrap suspensa ou inativa\n');
    process.exit(1);
  }
}

testEmail();
