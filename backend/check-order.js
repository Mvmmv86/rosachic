const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkOrder() {
  const orderId = '202501097237';
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: { include: { product: true } },
      shipping: true
    }
  });

  if (order) {
    console.log('\n📦 PEDIDO:', orderId);
    console.log('Status:', order.status);
    console.log('Payment Method:', order.paymentMethod);
    console.log('\n💰 VALORES:');
    console.log('Subtotal:', order.subtotal);
    console.log('Instalação:', order.instalacao);
    console.log('Frete:', order.frete);
    console.log('Desconto:', order.desconto);
    console.log('TOTAL:', order.total);
    console.log('\n📋 ITEMS:');
    order.items.forEach(item => {
      console.log(`- ${item.product.modelo}`);
      console.log(`  Dimensões: ${item.widthCm}cm × ${item.heightCm}cm`);
      console.log(`  Área: ${item.areaCobravel}m²`);
      console.log(`  Preço/m²: R$ ${item.pricePerM2}`);
      console.log(`  Quantidade: ${item.quantity}`);
      console.log(`  Subtotal: R$ ${item.subtotal}`);
    });
  } else {
    console.log('Pedido não encontrado');
  }

  await prisma.$disconnect();
}

checkOrder();