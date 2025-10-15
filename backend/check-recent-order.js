const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkRecentOrder() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 1,
    include: {
      items: { include: { product: true } },
      shipping: true,
      user: { select: { name: true, email: true } }
    }
  });

  if (orders.length > 0) {
    const order = orders[0];
    console.log('\n📦 PEDIDO MAIS RECENTE:', order.id);
    console.log('Usuário:', order.user.name, '-', order.user.email);
    console.log('Status:', order.status);
    console.log('Payment Method:', order.paymentMethod);
    console.log('Criado em:', order.createdAt);
    console.log('\n💰 VALORES:');
    console.log('Subtotal:', order.subtotal);
    console.log('Instalação:', order.instalacao);
    console.log('Frete:', order.frete);
    console.log('Desconto:', order.desconto);
    console.log('TOTAL:', order.total);
    console.log('\n📋 ITEMS (' + order.items.length + '):');
    order.items.forEach(item => {
      console.log(`\n- ${item.product.modelo}`);
      console.log(`  Dimensões: ${item.widthCm}cm × ${item.heightCm}cm`);
      console.log(`  Área: ${item.areaCobravel}m²`);
      console.log(`  Preço/m²: R$ ${item.pricePerM2}`);
      console.log(`  Quantidade: ${item.quantity}`);
      console.log(`  Subtotal: R$ ${item.subtotal}`);
    });
  } else {
    console.log('Nenhum pedido encontrado');
  }

  await prisma.$disconnect();
}

checkRecentOrder();
