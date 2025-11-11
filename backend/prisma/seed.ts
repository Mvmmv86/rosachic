import { PrismaClient, Luminosidade, Material } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados existentes na ordem correta (respeitando foreign keys)
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.productCharacteristic.deleteMany();
  await prisma.product.deleteMany();

  console.log('🗑️  Dados antigos removidos');

  // Produtos de exemplo
  const produtos = [
    {
      codigo: 'PRS-001',
      modelo: 'Persiana Rolô Blackout Premium',
      luminosidade: Luminosidade.Blackout,
      material: Material.Tecido,
      valorM2: 150.00,
      larguraMaxCm: 300,
      alturaMaxCm: 280,
      areaMinM2: 1.0,
      ambientes: JSON.stringify(['Quarto', 'Sala', 'Escritório']),
      imagens: JSON.stringify([
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
        'https://images.unsplash.com/photo-1616486447077-f8d3b7d4c0b4?w=800',
      ]),
      descricao: 'Persiana rolô em tecido blackout premium, ideal para total controle de luminosidade. Perfeita para quartos e ambientes que necessitam de escurecimento total.',
      estoque: 50,
      ativo: true,
      isLancamento: true,
      isMaisVendido: true,
      characteristics: {
        create: [
          { name: 'Tipo de Instalação', value: 'Parafuso', order: 1 },
          { name: 'Garantia', value: '2 anos', order: 2 },
          { name: 'Limpeza', value: 'Pano úmido', order: 3 },
          { name: 'Acionamento', value: 'Corrente', order: 4 },
        ]
      }
    },
    {
      codigo: 'PRS-002',
      modelo: 'Persiana Horizontal PVC Branca',
      luminosidade: Luminosidade.Regulavel,
      material: Material.PVC,
      valorM2: 89.90,
      larguraMaxCm: 250,
      alturaMaxCm: 220,
      areaMinM2: 0.8,
      ambientes: JSON.stringify(['Cozinha', 'Banheiro', 'Área de Serviço']),
      imagens: JSON.stringify([
        'https://images.unsplash.com/photo-1565538420870-da08ff96a207?w=800',
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
      ]),
      descricao: 'Persiana horizontal em PVC de alta qualidade. Resistente à umidade, ideal para cozinhas e banheiros. Fácil limpeza e regulagem de luz.',
      estoque: 100,
      ativo: true,
      isLancamento: false,
      isMaisVendido: true,
      characteristics: {
        create: [
          { name: 'Tipo de Instalação', value: 'Parafuso', order: 1 },
          { name: 'Garantia', value: '1 ano', order: 2 },
          { name: 'Limpeza', value: 'Pano úmido com detergente neutro', order: 3 },
          { name: 'Acionamento', value: 'Cordão', order: 4 },
          { name: 'Lâminas', value: '25mm', order: 5 },
        ]
      }
    },
    {
      codigo: 'PRS-003',
      modelo: 'Persiana Romana Linho Natural',
      luminosidade: Luminosidade.Translucida,
      material: Material.Tecido,
      valorM2: 180.00,
      larguraMaxCm: 280,
      alturaMaxCm: 260,
      areaMinM2: 1.2,
      ambientes: JSON.stringify(['Sala de Estar', 'Sala de Jantar', 'Quarto']),
      imagens: JSON.stringify([
        'https://images.unsplash.com/photo-1594822009933-6bf669b48f46?w=800',
        'https://images.unsplash.com/photo-1590075865168-ed3e6b3ac45c?w=800',
      ]),
      descricao: 'Elegante persiana romana em linho natural. Design sofisticado que combina funcionalidade e decoração. Filtra a luz de forma suave.',
      estoque: 30,
      ativo: true,
      isLancamento: true,
      isMaisVendido: false,
      characteristics: {
        create: [
          { name: 'Tipo de Instalação', value: 'Parafuso', order: 1 },
          { name: 'Garantia', value: '2 anos', order: 2 },
          { name: 'Limpeza', value: 'Aspirador de pó ou escova macia', order: 3 },
          { name: 'Acionamento', value: 'Corrente', order: 4 },
          { name: 'Material', value: '100% Linho', order: 5 },
        ]
      }
    },
    {
      codigo: 'PRS-004',
      modelo: 'Persiana Vertical Madeira Bambu',
      luminosidade: Luminosidade.Regulavel,
      material: Material.Bambu,
      valorM2: 220.00,
      larguraMaxCm: 350,
      alturaMaxCm: 300,
      areaMinM2: 1.5,
      ambientes: JSON.stringify(['Sala', 'Varanda', 'Escritório']),
      imagens: JSON.stringify([
        'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      ]),
      descricao: 'Persiana vertical em bambu sustentável. Proporciona privacidade e controle de luz com estilo natural e elegante.',
      estoque: 25,
      ativo: true,
      isLancamento: false,
      isMaisVendido: true,
      characteristics: {
        create: [
          { name: 'Tipo de Instalação', value: 'Suporte de teto', order: 1 },
          { name: 'Garantia', value: '3 anos', order: 2 },
          { name: 'Limpeza', value: 'Pano seco ou levemente úmido', order: 3 },
          { name: 'Acionamento', value: 'Corrente e bastão', order: 4 },
          { name: 'Sustentabilidade', value: 'Material renovável', order: 5 },
        ]
      }
    },
    {
      codigo: 'PRS-005',
      modelo: 'Persiana Horizontal Alumínio Slim',
      luminosidade: Luminosidade.Regulavel,
      material: Material.Aluminio,
      valorM2: 95.00,
      larguraMaxCm: 260,
      alturaMaxCm: 240,
      areaMinM2: 0.9,
      ambientes: JSON.stringify(['Escritório', 'Sala Comercial', 'Quarto']),
      imagens: JSON.stringify([
        'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=800',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      ]),
      descricao: 'Persiana horizontal moderna em alumínio. Lâminas finas de 16mm, leve e durável. Ideal para ambientes comerciais e residenciais.',
      estoque: 80,
      ativo: true,
      isLancamento: false,
      isMaisVendido: false,
      characteristics: {
        create: [
          { name: 'Tipo de Instalação', value: 'Parafuso', order: 1 },
          { name: 'Garantia', value: '2 anos', order: 2 },
          { name: 'Limpeza', value: 'Pano seco', order: 3 },
          { name: 'Acionamento', value: 'Cordão', order: 4 },
          { name: 'Lâminas', value: '16mm (slim)', order: 5 },
        ]
      }
    },
    {
      codigo: 'PRS-006',
      modelo: 'Persiana Rolô Screen Solar',
      luminosidade: Luminosidade.Translucida,
      material: Material.Tecido,
      valorM2: 165.00,
      larguraMaxCm: 320,
      alturaMaxCm: 300,
      areaMinM2: 1.0,
      ambientes: JSON.stringify(['Sala', 'Escritório', 'Varanda']),
      imagens: JSON.stringify([
        'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800',
        'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      ]),
      descricao: 'Persiana rolô em tecido screen com proteção solar. Reduz até 95% dos raios UV mantendo visibilidade externa. Eficiência térmica.',
      estoque: 45,
      ativo: true,
      isLancamento: true,
      isMaisVendido: false,
      characteristics: {
        create: [
          { name: 'Tipo de Instalação', value: 'Parafuso', order: 1 },
          { name: 'Garantia', value: '2 anos', order: 2 },
          { name: 'Limpeza', value: 'Aspirador ou pano úmido', order: 3 },
          { name: 'Acionamento', value: 'Corrente', order: 4 },
          { name: 'Proteção UV', value: '95%', order: 5 },
        ]
      }
    },
    {
      codigo: 'PRS-007',
      modelo: 'Persiana Painel Japonês',
      luminosidade: Luminosidade.Translucida,
      material: Material.Tecido,
      valorM2: 140.00,
      larguraMaxCm: 400,
      alturaMaxCm: 280,
      areaMinM2: 2.0,
      ambientes: JSON.stringify(['Sala Ampla', 'Porta Balcão', 'Divisória']),
      imagens: JSON.stringify([
        'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      ]),
      descricao: 'Painel japonês moderno e minimalista. Ideal para grandes vãos e portas de correr. Design contemporâneo e funcional.',
      estoque: 20,
      ativo: true,
      isLancamento: false,
      isMaisVendido: false,
      characteristics: {
        create: [
          { name: 'Tipo de Instalação', value: 'Trilho de teto', order: 1 },
          { name: 'Garantia', value: '2 anos', order: 2 },
          { name: 'Limpeza', value: 'Pano úmido', order: 3 },
          { name: 'Acionamento', value: 'Deslizante', order: 4 },
          { name: 'Painéis', value: '3 a 5 painéis', order: 5 },
        ]
      }
    },
    {
      codigo: 'PRS-008',
      modelo: 'Persiana Horizontal Madeira Cerejeira',
      luminosidade: Luminosidade.Regulavel,
      material: Material.Madeira,
      valorM2: 280.00,
      larguraMaxCm: 240,
      alturaMaxCm: 220,
      areaMinM2: 1.2,
      ambientes: JSON.stringify(['Sala', 'Escritório', 'Quarto Master']),
      imagens: JSON.stringify([
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        'https://images.unsplash.com/photo-1600607688960-e095ff83135b?w=800',
      ]),
      descricao: 'Persiana horizontal em madeira nobre cerejeira. Sofisticação e elegância. Acabamento premium com lâminas de 50mm.',
      estoque: 15,
      ativo: true,
      isLancamento: true,
      isMaisVendido: false,
      characteristics: {
        create: [
          { name: 'Tipo de Instalação', value: 'Parafuso', order: 1 },
          { name: 'Garantia', value: '3 anos', order: 2 },
          { name: 'Limpeza', value: 'Espanador ou pano seco', order: 3 },
          { name: 'Acionamento', value: 'Cordão de segurança', order: 4 },
          { name: 'Lâminas', value: '50mm madeira nobre', order: 5 },
        ]
      }
    },
  ];

  // Criar produtos com características
  console.log('📦 Criando produtos...');

  for (const produto of produtos) {
    await prisma.product.create({
      data: produto,
    });
    console.log(`   ✅ ${produto.modelo} (${produto.codigo})`);
  }

  console.log('');
  console.log('✨ Seed concluído com sucesso!');
  console.log(`📊 Total de produtos criados: ${produtos.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
