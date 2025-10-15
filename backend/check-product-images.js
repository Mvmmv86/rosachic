const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkProductImages() {
  const products = await prisma.product.findMany({
    take: 3
  });

  console.log('\n📸 FORMATO DAS IMAGENS NOS PRODUTOS:\n');

  products.forEach(product => {
    console.log(`Produto: ${product.modelo}`);
    console.log(`Campo imagens (raw): ${product.imagens}`);

    try {
      const imagens = JSON.parse(product.imagens);
      console.log(`Imagens parseadas:`, imagens);
      console.log(`Primeira imagem: ${imagens[0]}`);
    } catch (e) {
      console.log('Erro ao fazer parse das imagens');
    }
    console.log('');
  });

  await prisma.$disconnect();
}

checkProductImages();