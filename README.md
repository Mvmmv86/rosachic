# 🌹 Rosa Chic Persinas - E-commerce Premium

Sistema completo de e-commerce para venda de persianas personalizadas sob medida.

## 🚀 Tecnologias

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Type safety end-to-end
- **Tailwind CSS** - Estilização utility-first
- **shadcn/ui** - Componentes acessíveis

### Backend (Em desenvolvimento)
- **NestJS** - Framework Node.js enterprise
- **Prisma** - ORM type-safe
- **PostgreSQL** - Banco de dados relacional
- **Redis** - Cache e sessões

## 📦 Estrutura do Projeto

```
rosachic/
├── frontend/           # Aplicação Next.js
│   ├── src/
│   │   ├── app/       # App Router pages
│   │   ├── components/# Componentes React
│   │   └── lib/       # Utilitários e helpers
│   └── package.json
├── backend/           # API NestJS (Em desenvolvimento)
└── docs/             # Documentação
```

## 🔧 Configuração de Desenvolvimento

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Git

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/[seu-usuario]/rosachic.git
cd rosachic
```

2. Instale as dependências do frontend:
```bash
cd frontend
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
# Edite o arquivo .env.local com suas configurações
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em: http://localhost:4444

## 🔌 Portas Configuradas

| Serviço | Porta | URL |
|---------|-------|-----|
| Frontend | 4444 | http://localhost:4444 |
| Backend | 8889 | http://localhost:8889 |

## 📚 Documentação

- [Projeto Completo](./PROJETO_COMPLETO_ROSA_CHIC.md) - PRD e especificações
- [Design System](./DESIGN_SYSTEM_ROSA_CHIC.md) - Cores, tipografia e componentes
- [Boas Práticas](./ROSACHIC.md) - Guidelines de desenvolvimento
- [Plano de Ação](./PLANO_ACAO_CONTINUACAO.md) - Roadmap de implementação
- [Configuração de Portas](./PORTAS.md) - Portas dos serviços

## 🎨 Design

O design completo está disponível no Figma:
- [Rosa Chic - Figma](https://www.figma.com/design/ZpEDBAOT8ImPyplkSUILxo/R-Chic)

## 📝 Scripts Disponíveis

### Frontend
```bash
npm run dev        # Servidor de desenvolvimento (porta 4444)
npm run build      # Build de produção
npm run start      # Iniciar produção
npm run lint       # Verificar código
npm run type-check # Verificar tipos TypeScript
npm run format     # Formatar código
```

## 🚦 Status do Projeto

### ✅ Concluído
- [x] Setup inicial do projeto
- [x] Configuração Next.js 14 com TypeScript
- [x] Configuração Tailwind CSS
- [x] Estrutura base de pastas
- [x] Configuração de linting e formatação

### 🔄 Em Desenvolvimento
- [ ] Design System completo
- [ ] Componentes base (shadcn/ui)
- [ ] Páginas principais
- [ ] Calculadora de preços
- [ ] Integração com backend

### 📅 Próximas Etapas
- [ ] Backend NestJS
- [ ] Banco de dados PostgreSQL
- [ ] Sistema de autenticação
- [ ] Painel administrativo
- [ ] Integração com pagamentos
- [ ] Deploy em produção

## 👥 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é proprietário e confidencial. Todos os direitos reservados.

## 📞 Contato

Rosa Chic Persinas - [www.rosachic.com.br](https://www.rosachic.com.br)



