const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testTask215() {
  console.log('=====================================');
  console.log('📋 REVISÃO FINAL - Task 2.1.5');
  console.log('=====================================\n');

  const checks = {
    migration: false,
    database: false,
    tables: false,
    client: false,
    relations: false
  };

  try {
    // 1. Verificar migration
    const fs = require('fs');
    const migrationPath = './prisma/migrations/20251008132213_init/migration.sql';
    if (fs.existsSync(migrationPath)) {
      checks.migration = true;
      console.log('✅ Migration criada: 20251008132213_init');
    }

    // 2. Verificar database
    const dbPath = './prisma/dev.db';
    if (fs.existsSync(dbPath)) {
      const stats = fs.statSync(dbPath);
      checks.database = true;
      console.log(`✅ Database criado: dev.db (${(stats.size / 1024).toFixed(2)} KB)`);
    }

    // 3. Verificar tabelas
    const tables = await prisma.$queryRaw`
      SELECT name FROM sqlite_master
      WHERE type='table'
      AND name NOT LIKE 'sqlite_%'
      AND name NOT LIKE '_prisma%'
      ORDER BY name
    `;

    const expectedTables = ['users', 'products', 'orders', 'order_items', 'shipping', 'favorites'];
    const actualTables = tables.map(t => t.name);

    if (actualTables.length === 6 && expectedTables.every(t => actualTables.includes(t))) {
      checks.tables = true;
      console.log('✅ Tabelas criadas: ' + actualTables.join(', '));
    }

    // 4. Verificar Prisma Client
    const models = Object.keys(prisma).filter(k => !k.startsWith('$') && !k.startsWith('_'));
    if (models.length === 7) { // 6 models + constructor
      checks.client = true;
      console.log('✅ Prisma Client gerado com todos os models');
    }

    // 5. Testar relações
    // Criar dados de teste para verificar FKs
    const testUser = await prisma.user.create({
      data: {
        email: 'test@test.com',
        passwordHash: 'hash',
        name: 'Test User',
        role: 'USER'
      }
    });

    const testProduct = await prisma.product.create({
      data: {
        codigo: 'TEST001',
        modelo: 'Test Model',
        luminosidade: 'Blackout',
        material: 'Tecido',
        valorM2: 100,
        larguraMaxCm: 300,
        alturaMaxCm: 300,
        ambientes: JSON.stringify(['sala', 'quarto']),
        imagens: JSON.stringify(['img1.jpg', 'img2.jpg']),
        descricao: 'Test product'
      }
    });

    // Testar criação de favorito (testa relação M:N)
    const testFavorite = await prisma.favorite.create({
      data: {
        userId: testUser.id,
        productId: testProduct.id
      }
    });

    // Limpar dados de teste
    await prisma.favorite.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    checks.relations = true;
    console.log('✅ Relações entre tabelas funcionando');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }

  // Resumo final
  console.log('\n=====================================');
  console.log('📊 RESUMO DA VALIDAÇÃO:');
  console.log('=====================================');

  const allChecks = Object.values(checks).every(c => c);

  console.log(`\n${allChecks ? '✅' : '❌'} Migration: ${checks.migration ? 'OK' : 'FALHOU'}`);
  console.log(`${allChecks ? '✅' : '❌'} Database: ${checks.database ? 'OK' : 'FALHOU'}`);
  console.log(`${allChecks ? '✅' : '❌'} Tabelas: ${checks.tables ? 'OK' : 'FALHOU'}`);
  console.log(`${allChecks ? '✅' : '❌'} Prisma Client: ${checks.client ? 'OK' : 'FALHOU'}`);
  console.log(`${allChecks ? '✅' : '❌'} Relações: ${checks.relations ? 'OK' : 'FALHOU'}`);

  if (allChecks) {
    console.log('\n🎉 TASK 2.1.5 COMPLETAMENTE VALIDADA!');
    console.log('✨ Pronto para prosseguir para Task 2.2.1');
  } else {
    console.log('\n⚠️ Alguns checks falharam. Revisar implementação.');
  }

  await prisma.$disconnect();
}

testTask215();