// Teste simples para verificar as configurações

console.log('📋 Verificando configurações do backend Rosa Chic...\n');

// 1. Testar se as dependências foram instaladas
console.log('1️⃣ Verificando dependências instaladas:');
try {
  require('@nestjs/throttler');
  console.log('   ✅ @nestjs/throttler instalado');
} catch {
  console.log('   ❌ @nestjs/throttler NÃO encontrado');
}

try {
  require('zod');
  console.log('   ✅ zod instalado');
} catch {
  console.log('   ❌ zod NÃO encontrado');
}

try {
  require('@prisma/client');
  console.log('   ✅ @prisma/client instalado');
} catch {
  console.log('   ❌ @prisma/client NÃO encontrado');
}

// 2. Verificar se o Prisma Schema existe
console.log('\n2️⃣ Verificando Prisma Schema:');
const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
if (fs.existsSync(schemaPath)) {
  console.log('   ✅ prisma/schema.prisma existe');
  const content = fs.readFileSync(schemaPath, 'utf8');
  const models = content.match(/model \w+/g);
  if (models) {
    console.log(`   ✅ ${models.length} models encontrados: ${models.map(m => m.replace('model ', '')).join(', ')}`);
  }
} else {
  console.log('   ❌ prisma/schema.prisma NÃO encontrado');
}

// 3. Verificar arquivo de validação de env
console.log('\n3️⃣ Verificando validação de env:');
const envValidationPath = path.join(__dirname, 'src', 'config', 'env.validation.ts');
if (fs.existsSync(envValidationPath)) {
  console.log('   ✅ src/config/env.validation.ts existe');
} else {
  console.log('   ❌ src/config/env.validation.ts NÃO encontrado');
}

// 4. Verificar .env.example
console.log('\n4️⃣ Verificando variáveis de ambiente:');
const envExamplePath = path.join(__dirname, '.env.example');
if (fs.existsSync(envExamplePath)) {
  console.log('   ✅ .env.example existe');
  const content = fs.readFileSync(envExamplePath, 'utf8');
  const requiredVars = ['DATABASE_URL', 'JWT_SECRET', 'JWT_EXPIRATION', 'CORS_ORIGIN', 'RATE_LIMIT_TTL'];
  requiredVars.forEach(varName => {
    if (content.includes(varName)) {
      console.log(`   ✅ ${varName} configurado`);
    } else {
      console.log(`   ❌ ${varName} NÃO encontrado`);
    }
  });
} else {
  console.log('   ❌ .env.example NÃO encontrado');
}

// 5. Testar Prisma Client
console.log('\n5️⃣ Testando Prisma Client:');
try {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  console.log('   ✅ Prisma Client criado com sucesso');

  // Listar os modelos disponíveis
  const models = Object.keys(prisma).filter(key => !key.startsWith('$') && !key.startsWith('_'));
  console.log(`   ✅ Modelos disponíveis: ${models.join(', ')}`);
} catch (error) {
  console.log('   ❌ Erro ao criar Prisma Client:', error.message);
}

console.log('\n✨ Teste concluído!');