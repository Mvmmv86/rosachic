require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdmin() {
  console.log('🔧 Criando usuário ADMIN no Supabase...\n');

  try {
    const adminData = {
      email: 'admin@rosachic.com.br',
      password: 'Admin@2025',
      name: 'Admin Rosa Chic',
      phone: '(41) 99999-9999',
      role: 'ADMIN'
    };

    const existing = await prisma.user.findUnique({
      where: { email: adminData.email }
    });

    if (existing) {
      console.log('⚠️  Usuário admin já existe!');
      console.log(`📧 Email: ${existing.email}`);
      console.log(`👤 Nome: ${existing.name}`);
      console.log(`🔑 Role: ${existing.role}\n`);

      if (existing.role !== 'ADMIN') {
        console.log('🔄 Atualizando role para ADMIN...');
        await prisma.user.update({
          where: { id: existing.id },
          data: { role: 'ADMIN' }
        });
        console.log('✅ Role atualizada!\n');
      }

      console.log('═══════════════════════════════════════════════════════');
      console.log('📋 CREDENCIAIS DO ADMIN:');
      console.log('═══════════════════════════════════════════════════════');
      console.log(`📧 Email: ${adminData.email}`);
      console.log(`🔑 Senha: ${adminData.password}`);
      console.log('═══════════════════════════════════════════════════════\n');
      return;
    }

    console.log('🔐 Gerando hash da senha...');
    const passwordHash = await bcrypt.hash(adminData.password, 12);

    console.log('👤 Criando usuário ADMIN...');
    const admin = await prisma.user.create({
      data: {
        email: adminData.email,
        passwordHash,
        name: adminData.name,
        phone: adminData.phone,
        role: adminData.role
      }
    });

    console.log('\n✅ Usuário ADMIN criado com sucesso!\n');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📋 CREDENCIAIS DO ADMIN:');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`📧 Email: ${adminData.email}`);
    console.log(`🔑 Senha: ${adminData.password}`);
    console.log(`👤 Nome: ${adminData.name}`);
    console.log(`🆔 ID: ${admin.id}`);
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('🌐 Acesse o admin em: http://localhost:5000');
    console.log('🔐 Faça login com as credenciais acima\n');

  } catch (error) {
    console.error('❌ Erro ao criar admin:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
