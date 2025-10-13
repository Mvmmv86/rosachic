const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
  try {
    const products = await prisma.product.findMany();
    console.log('\n📦 Produtos no banco:');
    console.log('Total:', products.length);
    console.log('\nDetalhes:');
    products.forEach(p => {
      console.log(`  ✅ ${p.codigo}: ${p.modelo}`);
      console.log(`     Material: ${p.material} | Luminosidade: ${p.luminosidade}`);
      console.log(`     Preço: R$ ${p.valorM2}/m² | Estoque: ${p.estoque}`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
