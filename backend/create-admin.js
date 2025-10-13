const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    // Deletar admin existente se houver
    await prisma.user.deleteMany({
      where: { email: 'admin@admin.com' }
    })

    // Hash da senha "admin123"
    const passwordHash = await bcrypt.hash('admin123', 12)

    // Criar novo admin
    const admin = await prisma.user.create({
      data: {
        email: 'admin@admin.com',
        name: 'Administrador',
        passwordHash: passwordHash,
        role: 'ADMIN'
      }
    })

    console.log('✅ Admin criado com sucesso!')
    console.log('Email:', admin.email)
    console.log('Senha: admin123')
    console.log('Role:', admin.role)
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
