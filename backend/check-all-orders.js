const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkOrders() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true, email: true } }
    }
  });

  console.log('\n📦 TODOS OS PEDIDOS:\n');
  orders.forEach(order => {
    console.log(`ID: ${order.id.slice(0, 8)}...`);
    console.log(`  Cliente: ${order.user.name} (${order.user.email})`);
    console.log(`  Status Pedido: ${order.status}`);
    console.log(`  Status Pagamento: ${order.paymentStatus}`);
    console.log(`  Método: ${order.paymentMethod}`);
    console.log(`  Total: R$ ${order.total}`);
    console.log(`  Data: ${order.createdAt}`);
    console.log('');
  });

  await prisma.$disconnect();
}

checkOrders();
