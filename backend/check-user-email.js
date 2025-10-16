const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUserEmail() {
  const users = await prisma.user.findMany({
    select: { name: true, email: true, createdAt: true }
  });

  console.log('\n👤 USUÁRIOS CADASTRADOS:\n');
  users.forEach(user => {
    console.log(`Nome: ${user.name}`);
    console.log(`E-mail: ${user.email}`);
    console.log(`Criado em: ${user.createdAt}`);
    console.log('---');
  });

  await prisma.$disconnect();
}

checkUserEmail();