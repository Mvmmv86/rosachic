# 🔌 Configuração de Portas - Rosa Chic

## Portas Configuradas

| Serviço | Porta | URL | Status |
|---------|-------|-----|--------|
| **Frontend (Next.js)** | `4444` | http://localhost:4444 | ✅ Configurado |
| **Backend (FastAPI)** | `8889` | http://localhost:8889 | 🔄 A configurar |
| **Banco de Dados (PostgreSQL)** | `5433` | localhost:5433 | 🔄 A configurar |
| **Redis (Cache)** | `6380` | localhost:6380 | 🔄 A configurar |

## Como Iniciar

### Frontend
```bash
cd frontend
npm run dev  # Inicia na porta 4444
```

### Backend (quando implementado)
```bash
cd backend
python -m uvicorn main:app --reload --port 8889
```

## Variáveis de Ambiente

### Frontend (.env.local)
```env
PORT=4444
NEXT_PUBLIC_API_URL=http://localhost:8889/api
```

### Backend (.env) - A ser configurado
```env
PORT=8889
DATABASE_URL=postgresql://user:pass@localhost:5433/rosachic
REDIS_URL=redis://localhost:6380
```

## Notas
- Portas escolhidas para evitar conflitos com outros projetos
- Frontend: 4444 (número fácil de lembrar)
- Backend: 8889 (padrão para APIs)
- PostgreSQL: 5433 (evita conflito com 5432 padrão)
- Redis: 6380 (evita conflito com 6379 padrão)