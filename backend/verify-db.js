const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verifyDatabase() {
  console.log('🔍 Verificando banco de dados Rosa Chic...\n');

  try {
    // Verificar tabelas criadas
    const tables = await prisma.$queryRaw`
      SELECT name FROM sqlite_master
      WHERE type='table'
      AND name NOT LIKE 'sqlite_%'
      AND name NOT LIKE '_prisma%'
      ORDER BY name
    `;

    console.log('📊 Tabelas criadas:');
    tables.forEach(table => {
      console.log(`   ✅ ${table.name}`);
    });

    // Contar registros em cada tabela
    console.log('\n📈 Contagem de registros:');
    console.log(`   • Users: ${await prisma.user.count()}`);
    console.log(`   • Products: ${await prisma.product.count()}`);
    console.log(`   • Orders: ${await prisma.order.count()}`);
    console.log(`   • OrderItems: ${await prisma.orderItem.count()}`);
    console.log(`   • Shipping: ${await prisma.shipping.count()}`);
    console.log(`   • Favorites: ${await prisma.favorite.count()}`);

    console.log('\n✅ Task 2.1.5 COMPLETA!');
    console.log('   ✓ Migration criada');
    console.log('   ✓ Database criado (dev.db)');
    console.log('   ✓ Tabelas criadas');
    console.log('   ✓ Prisma Client gerado\n');

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyDatabase();