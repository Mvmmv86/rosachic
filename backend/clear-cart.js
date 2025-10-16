const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearAllCarts() {
  // Deletar todos os itens de carrinho
  await prisma.cartItem.deleteMany({});

  // Deletar todos os carrinhos
  await prisma.cart.deleteMany({});

  console.log('✅ Todos os carrinhos foram limpos!');

  await prisma.$disconnect();
}

clearAllCarts();