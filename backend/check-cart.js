const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkCart() {
  const carts = await prisma.cart.findMany({
    include: { items: { include: { product: true } } }
  });
  console.log('Total de carrinhos:', carts.length);
  carts.forEach(cart => {
    console.log(`\nCarrinho ID: ${cart.id}`);
    console.log(`User ID: ${cart.userId}`);
    console.log(`Items: ${cart.items.length}`);
    cart.items.forEach(item => {
      console.log(`  - ${item.product.modelo} (${item.quantity}x)`);
    });
  });
  await prisma.$disconnect();
}

checkCart();
