const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function approveAllConfirmed() {
  // Buscar todos os pedidos confirmados com pagamento pendente
  const orders = await prisma.order.findMany({
    where: {
      status: 'CONFIRMED',
      paymentStatus: 'PENDING'
    }
  });

  console.log(`\n📦 Encontrados ${orders.length} pedido(s) confirmado(s) com pagamento pendente\n`);

  for (const order of orders) {
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentStatus: 'APPROVED' }
    });
    console.log(`✅ Pagamento aprovado para pedido ${order.id.slice(0, 8)}... - R$ ${order.total}`);
  }

  console.log('\n✅ Todos os pagamentos foram aprovados!');
  await prisma.$disconnect();
}

approveAllConfirmed();
