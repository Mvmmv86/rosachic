const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Atualizar o produto "rolo teste" com dimensões corretas
  const updated = await prisma.product.update({
    where: { id: '24d9f6fa-b97b-4740-90b7-9a15fecd0556' },
    data: {
      larguraMaxCm: 400,  // 4 metros
      alturaMaxCm: 400,   // 4 metros
      areaMinM2: 1.0      // 1 m² mínimo
    }
  });

  console.log('Produto atualizado com sucesso:');
  console.log(JSON.stringify({
    id: updated.id,
    modelo: updated.modelo,
    larguraMaxCm: updated.larguraMaxCm,
    alturaMaxCm: updated.alturaMaxCm,
    areaMinM2: updated.areaMinM2
  }, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());