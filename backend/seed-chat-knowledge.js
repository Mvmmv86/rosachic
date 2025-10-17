require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedChatKnowledge() {
  console.log('🌱 Populando conhecimento inicial do Chat IA...\n');

  const knowledge = [
    {
      title: 'Sobre a Rosa Chic',
      category: 'Empresa',
      content: `A Rosa Chic é especialista em persianas sob medida há mais de 10 anos em Curitiba.

Oferecemos produtos de alta qualidade com design exclusivo, fabricação personalizada e instalação profissional.

Nossa missão é transformar ambientes combinando elegância, funcionalidade e durabilidade. Atendemos Curitiba, região metropolitana e entregamos para todo o Brasil.`
    },
    {
      title: 'Tipos de Persianas',
      category: 'Produtos',
      content: `Oferecemos 5 tipos principais de persianas sob medida:

1. **Rolô** - Minimalista e moderna, ideal para ambientes clean. Fácil de limpar e operar.

2. **Romana** - Elegante com pregas horizontais. Sofisticação para salas e quartos.

3. **Vertical** - Perfeita para janelas grandes, portas de vidro e sacadas. Controle preciso de luminosidade.

4. **Celular Blackout** - Máximo bloqueio de luz (100%), ideal para quartos e home theater. Isolamento térmico excelente.

5. **Double Vision** - Alterna entre privacidade total e luz natural com um único movimento. Tecnologia exclusiva.

Todas disponíveis em materiais Tecido, PVC, Madeira e Bambu.`
    },
    {
      title: 'Como Medir Corretamente',
      category: 'Instalação',
      content: `Para medir suas persianas corretamente, siga nosso passo a passo:

**1. Ferramentas:** Use trena metálica (mais precisa que fita)

**2. Largura:**
- Meça em 3 pontos (topo, meio e base)
- Considere sempre a MENOR medida
- Adicione 10cm de cada lado para instalação

**3. Altura:**
- Meça em 3 pontos (esquerda, centro, direita)
- Considere sempre a MENOR medida
- Adicione 10cm acima e abaixo

**4. Use nossa calculadora online!**
No site, basta informar largura e altura que calculamos automaticamente a área e o valor total.

Nosso time também pode fazer a medição no local (Curitiba e região).`
    },
    {
      title: 'Preços e Formas de Pagamento',
      category: 'Comercial',
      content: `**Faixa de Preços:**
Nossos produtos variam de R$ 150 a R$ 450 por m², dependendo do modelo, material e acabamento escolhidos.

**Cálculo Personalizado:**
Use nossa calculadora online! Basta informar as medidas desejadas (largura x altura) e o sistema calcula automaticamente o valor exato.

**Formas de Pagamento:**
- PIX (5% de desconto)
- Cartão de Crédito (até 12x sem juros)
- Boleto Bancário (à vista)

**Instalação:**
Instalação profissional disponível em Curitiba por apenas R$ 50 por persiana.`
    },
    {
      title: 'Entrega e Prazos',
      category: 'Logística',
      content: `**Prazo de Produção:**
5 a 7 dias úteis após confirmação do pedido (produtos sob medida, fabricados exclusivamente para você).

**Entrega:**
- **Curitiba:** Frete GRÁTIS + instalação opcional (R$ 50/unidade)
- **Região Metropolitana:** Frete grátis acima de R$ 500
- **Todo o Brasil:** Via Correios com rastreamento

**Rastreamento:**
Após o envio, você recebe o código de rastreamento por email e pode acompanhar em tempo real.

**Garantia:**
12 meses contra defeitos de fabricação + suporte técnico vitalício.`
    },
    {
      title: 'Dicas de Escolha por Ambiente',
      category: 'Consultoria',
      content: `**Quarto:**
Celular Blackout (bloqueio total de luz) ou Romana (elegância + escurecimento). Cores neutras para tranquilidade.

**Sala:**
Rolô ou Double Vision (controle flexível de luz). Cores que harmonizem com decoração.

**Cozinha:**
Rolô em PVC (fácil limpeza, resistente à umidade). Cores claras refletem calor.

**Escritório:**
Double Vision ou Vertical (controle de claridade para telas). Reduz reflexos.

**Banheiro:**
Rolô em PVC ou Blackout (privacidade + resistência à umidade).

**Varanda/Sacada:**
Vertical em PVC ou Bambu (resistente a sol e chuva). Proteção UV.`
    }
  ];

  try {
    // Limpar conhecimento existente (opcional)
    await prisma.chatKnowledge.deleteMany({});
    console.log('🗑️  Conhecimento anterior removido\n');

    // Inserir novo conhecimento
    for (const item of knowledge) {
      const created = await prisma.chatKnowledge.create({ data: item });
      console.log(`✅ ${item.title} (${item.category})`);
    }

    console.log(`\n🎉 ${knowledge.length} itens de conhecimento adicionados com sucesso!\n`);

    // Criar configuração inicial da OpenAI (se não existir)
    const existingConfig = await prisma.openAIConfig.findFirst();

    if (!existingConfig) {
      await prisma.openAIConfig.create({
        data: {
          apiKey: process.env.OPENAI_API_KEY || '',
          model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
          temperature: 0.7,
          maxTokens: 500,
          active: true,
        },
      });
      console.log('✅ Configuração OpenAI criada\n');
    } else {
      console.log('ℹ️  Configuração OpenAI já existe\n');
    }

    console.log('═══════════════════════════════════════════════════════');
    console.log('🤖 Chat IA está pronto para uso!');
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 Conhecimento:', knowledge.length, 'itens');
    console.log('🔑 API Key:', process.env.OPENAI_API_KEY ? 'Configurada ✅' : 'Não configurada ❌');
    console.log('🤖 Model:', process.env.OPENAI_MODEL || 'gpt-4o-mini');
    console.log('═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('❌ Erro ao popular conhecimento:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedChatKnowledge();
