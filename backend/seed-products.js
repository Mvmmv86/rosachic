const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const products = [
  {
    codigo: 'PRS001',
    modelo: 'Persiana Romana Classic',
    luminosidade: 'Translucida',
    material: 'Tecido',
    valorM2: 189.90,
    larguraMaxCm: 300,
    alturaMaxCm: 300,
    areaMinM2: 1.0,
    ambientes: JSON.stringify(['sala', 'quarto', 'escritório']),
    imagens: JSON.stringify([
      'romana-classic-1.jpg',
      'romana-classic-2.jpg'
    ]),
    descricao: 'Persiana romana clássica com tecido translúcido de alta qualidade. Ideal para ambientes que precisam de luz natural filtrada.',
    estoque: 50,
    ativo: true
  },
  {
    codigo: 'PRS002',
    modelo: 'Persiana Rolô Blackout',
    luminosidade: 'Blackout',
    material: 'Tecido',
    valorM2: 229.90,
    larguraMaxCm: 400,
    alturaMaxCm: 400,
    areaMinM2: 1.0,
    ambientes: JSON.stringify(['quarto', 'sala de TV', 'home theater']),
    imagens: JSON.stringify([
      'rolo-blackout-1.jpg',
      'rolo-blackout-2.jpg'
    ]),
    descricao: 'Persiana rolô com tecido blackout 100% bloqueio de luz. Perfeita para quartos e home theaters.',
    estoque: 30,
    ativo: true
  },
  {
    codigo: 'PRS003',
    modelo: 'Persiana Horizontal PVC',
    luminosidade: 'Translucida',
    material: 'PVC',
    valorM2: 149.90,
    larguraMaxCm: 250,
    alturaMaxCm: 250,
    areaMinM2: 1.0,
    ambientes: JSON.stringify(['cozinha', 'banheiro', 'área de serviço']),
    imagens: JSON.stringify([
      'horizontal-pvc-1.jpg',
      'horizontal-pvc-2.jpg'
    ]),
    descricao: 'Persiana horizontal em PVC resistente à umidade. Ideal para áreas molhadas.',
    estoque: 45,
    ativo: true
  },
  {
    codigo: 'PRS004',
    modelo: 'Persiana Vertical Tecido',
    luminosidade: 'Translucida',
    material: 'Tecido',
    valorM2: 199.90,
    larguraMaxCm: 500,
    alturaMaxCm: 300,
    areaMinM2: 1.0,
    ambientes: JSON.stringify(['escritório', 'sala de reunião', 'consultório']),
    imagens: JSON.stringify([
      'vertical-tecido-1.jpg',
      'vertical-tecido-2.jpg'
    ]),
    descricao: 'Persiana vertical em tecido, ideal para ambientes corporativos e comerciais.',
    estoque: 25,
    ativo: true
  },
  {
    codigo: 'PRS005',
    modelo: 'Persiana de Madeira Natural',
    luminosidade: 'Translucida',
    material: 'Madeira',
    valorM2: 389.90,
    larguraMaxCm: 200,
    alturaMaxCm: 250,
    areaMinM2: 1.0,
    ambientes: JSON.stringify(['sala', 'varanda', 'quarto']),
    imagens: JSON.stringify([
      'madeira-natural-1.jpg',
      'madeira-natural-2.jpg'
    ]),
    descricao: 'Persiana de madeira natural com acabamento premium. Traz elegância e sofisticação ao ambiente.',
    estoque: 15,
    ativo: true
  },
  {
    codigo: 'PRS006',
    modelo: 'Persiana de Bambu',
    luminosidade: 'Translucida',
    material: 'Bambu',
    valorM2: 269.90,
    larguraMaxCm: 220,
    alturaMaxCm: 280,
    areaMinM2: 1.0,
    ambientes: JSON.stringify(['varanda', 'jardim de inverno', 'spa']),
    imagens: JSON.stringify([
      'bambu-1.jpg',
      'bambu-2.jpg'
    ]),
    descricao: 'Persiana de bambu ecológica. Perfeita para ambientes que buscam conexão com a natureza.',
    estoque: 20,
    ativo: true
  },
  {
    codigo: 'PRS007',
    modelo: 'Persiana Double Vision',
    luminosidade: 'Translucida',
    material: 'Tecido',
    valorM2: 319.90,
    larguraMaxCm: 350,
    alturaMaxCm: 350,
    areaMinM2: 1.0,
    ambientes: JSON.stringify(['sala', 'quarto', 'escritório']),
    imagens: JSON.stringify([
      'double-vision-1.jpg',
      'double-vision-2.jpg'
    ]),
    descricao: 'Persiana double vision com duas camadas de tecido para controle perfeito de luminosidade.',
    estoque: 18,
    ativo: true
  },
  {
    codigo: 'PRS008',
    modelo: 'Persiana Celular Blackout',
    luminosidade: 'Blackout',
    material: 'Tecido',
    valorM2: 449.90,
    larguraMaxCm: 300,
    alturaMaxCm: 300,
    areaMinM2: 1.0,
    ambientes: JSON.stringify(['quarto', 'home office', 'sala de TV']),
    imagens: JSON.stringify([
      'celular-blackout-1.jpg',
      'celular-blackout-2.jpg'
    ]),
    descricao: 'Persiana celular com tecnologia honeycomb para isolamento térmico e acústico superior.',
    estoque: 10,
    ativo: true
  }
];

async function seed() {
  console.log('🌱 Iniciando seed de produtos...\n');

  try {
    // Limpar produtos existentes
    await prisma.product.deleteMany();
    console.log('✅ Produtos existentes removidos');

    // Inserir novos produtos
    for (const product of products) {
      const created = await prisma.product.create({
        data: product
      });
      console.log(`✅ Produto criado: ${created.modelo} (${created.codigo})`);
    }

    console.log(`\n🎉 Seed concluído! ${products.length} produtos criados.`);
  } catch (error) {
    console.error('❌ Erro no seed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();