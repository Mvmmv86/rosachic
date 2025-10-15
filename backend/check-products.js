const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  console.log(JSON.stringify(products.map(p => ({
    id: p.id,
    modelo: p.modelo,
    larguraMaxCm: p.larguraMaxCm,
    alturaMaxCm: p.alturaMaxCm,
    areaMinM2: p.areaMinM2
  })), null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());