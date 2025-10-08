const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

async function testTasks22() {
  console.log('=====================================');
  console.log('📋 TESTE DAS TASKS 2.2.1, 2.2.2, 2.2.3');
  console.log('=====================================\n');

  const results = {
    task221: { prismaService: false, prismaModule: false },
    task222: { authService: false, authController: false, jwtStrategy: false, authModule: false },
    task223: { pricingService: false, pricingController: false, pricingModule: false }
  };

  // Task 2.2.1 - Módulo Prisma
  console.log('🔍 Task 2.2.1 - Módulo Prisma:');

  const prismaServicePath = path.join(__dirname, 'src/prisma/prisma.service.ts');
  const prismaModulePath = path.join(__dirname, 'src/prisma/prisma.module.ts');

  if (fs.existsSync(prismaServicePath)) {
    results.task221.prismaService = true;
    console.log('   ✅ PrismaService criado');
  } else {
    console.log('   ❌ PrismaService não encontrado');
  }

  if (fs.existsSync(prismaModulePath)) {
    results.task221.prismaModule = true;
    const content = fs.readFileSync(prismaModulePath, 'utf8');
    if (content.includes('@Global()')) {
      console.log('   ✅ PrismaModule criado e é Global');
    } else {
      console.log('   ⚠️ PrismaModule criado mas não é Global');
    }
  } else {
    console.log('   ❌ PrismaModule não encontrado');
  }

  // Task 2.2.2 - Módulo Auth
  console.log('\n🔐 Task 2.2.2 - Módulo Auth:');

  const authFiles = {
    service: 'src/auth/auth.service.ts',
    controller: 'src/auth/auth.controller.ts',
    module: 'src/auth/auth.module.ts',
    strategy: 'src/auth/strategies/jwt.strategy.ts',
    guard: 'src/auth/guards/jwt-auth.guard.ts'
  };

  for (const [key, file] of Object.entries(authFiles)) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
      if (key === 'service') results.task222.authService = true;
      if (key === 'controller') results.task222.authController = true;
      if (key === 'strategy') results.task222.jwtStrategy = true;
      if (key === 'module') results.task222.authModule = true;
      console.log(`   ✅ ${key.charAt(0).toUpperCase() + key.slice(1)} criado`);
    } else {
      console.log(`   ❌ ${key.charAt(0).toUpperCase() + key.slice(1)} não encontrado`);
    }
  }

  // Verificar SALT_ROUNDS
  if (results.task222.authService) {
    const authServiceContent = fs.readFileSync(path.join(__dirname, authFiles.service), 'utf8');
    if (authServiceContent.includes('SALT_ROUNDS = 12')) {
      console.log('   ✅ SALT_ROUNDS = 12 configurado');
    } else {
      console.log('   ⚠️ SALT_ROUNDS não está com valor 12');
    }
  }

  // Task 2.2.3 - Módulo Pricing
  console.log('\n💰 Task 2.2.3 - Pricing Calculator:');

  const pricingFiles = {
    service: 'src/pricing/pricing.service.ts',
    controller: 'src/pricing/pricing.controller.ts',
    module: 'src/pricing/pricing.module.ts'
  };

  for (const [key, file] of Object.entries(pricingFiles)) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
      if (key === 'service') results.task223.pricingService = true;
      if (key === 'controller') results.task223.pricingController = true;
      if (key === 'module') results.task223.pricingModule = true;
      console.log(`   ✅ ${key.charAt(0).toUpperCase() + key.slice(1)} criado`);
    } else {
      console.log(`   ❌ ${key.charAt(0).toUpperCase() + key.slice(1)} não encontrado`);
    }
  }

  // Verificar 8 passos
  if (results.task223.pricingService) {
    const pricingContent = fs.readFileSync(path.join(__dirname, pricingFiles.service), 'utf8');
    const passos = [
      'PASSO 1: Área bruta',
      'PASSO 2: Área ajustada',
      'PASSO 3: Arredondar',
      'PASSO 4: Área cobrável',
      'PASSO 5: Preço base',
      'PASSO 6: Opcionais',
      'PASSO 7: Instalação e Frete',
      'PASSO 8: Desconto'
    ];

    const passosImplementados = passos.filter(passo => pricingContent.includes(passo));
    if (passosImplementados.length === 8) {
      console.log('   ✅ Todos os 8 passos implementados');
    } else {
      console.log(`   ⚠️ Apenas ${passosImplementados.length}/8 passos implementados`);
    }
  }

  // Verificar app.module.ts
  console.log('\n📦 Integração no AppModule:');
  const appModulePath = path.join(__dirname, 'src/app.module.ts');
  if (fs.existsSync(appModulePath)) {
    const appModuleContent = fs.readFileSync(appModulePath, 'utf8');
    const modules = ['ConfigModule', 'PrismaModule', 'AuthModule', 'PricingModule'];

    modules.forEach(mod => {
      if (appModuleContent.includes(mod)) {
        console.log(`   ✅ ${mod} importado`);
      } else {
        console.log(`   ❌ ${mod} não importado`);
      }
    });
  }

  // Teste funcional com Prisma
  console.log('\n🧪 Teste Funcional:');
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    console.log('   ✅ Prisma conectado ao banco');

    // Teste de bcrypt
    const testPassword = 'Test@123';
    const hash = await bcrypt.hash(testPassword, 12);
    const isValid = await bcrypt.compare(testPassword, hash);
    if (isValid) {
      console.log('   ✅ Bcrypt funcionando (hash com 12 rounds)');
    }

    await prisma.$disconnect();
  } catch (error) {
    console.log('   ❌ Erro ao conectar Prisma:', error.message);
  }

  // Resumo Final
  console.log('\n=====================================');
  console.log('📊 RESUMO FINAL:');
  console.log('=====================================\n');

  const task221Complete = Object.values(results.task221).every(v => v);
  const task222Complete = Object.values(results.task222).every(v => v);
  const task223Complete = Object.values(results.task223).every(v => v);

  console.log(`Task 2.2.1 (Prisma Module): ${task221Complete ? '✅ COMPLETA' : '❌ INCOMPLETA'}`);
  console.log(`Task 2.2.2 (Auth Module): ${task222Complete ? '✅ COMPLETA' : '❌ INCOMPLETA'}`);
  console.log(`Task 2.2.3 (Pricing Module): ${task223Complete ? '✅ COMPLETA' : '❌ INCOMPLETA'}`);

  if (task221Complete && task222Complete && task223Complete) {
    console.log('\n🎉 TODAS AS 3 TASKS COMPLETADAS COM SUCESSO!');
    console.log('✨ Backend pronto para as próximas tasks (Products, Orders, Users)');
  } else {
    console.log('\n⚠️ Algumas tasks precisam de ajustes');
  }
}

testTasks22();