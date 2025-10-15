const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function approvePayment() {
  // Buscar o pedido confirmado mais recente
  const order = await prisma.order.findFirst({
    where: { status: 'CONFIRMED' },
    orderBy: { createdAt: 'desc' }
  });

  if (!order) {
    console.log('❌ Nenhum pedido confirmado encontrado');
    await prisma.$disconnect();
    return;
  }

  const orderId = order.id;

  const updated = await prisma.order.update({
    where: { id: orderId },
    data: {
      paymentStatus: 'APPROVED'
    }
  });

  console.log('✅ Pagamento aprovado para pedido:', orderId);
  console.log('   Status Pedido:', updated.status);
  console.log('   Status Pagamento:', updated.paymentStatus);
  console.log('   Total:', updated.total);

  await prisma.$disconnect();
}

approvePayment();
