-- Migration: Adicionar campos isLancamento e isMaisVendido
-- Data: 20/10/2025

-- Adicionar colunas na tabela products
ALTER TABLE "products"
ADD COLUMN IF NOT EXISTS "is_lancamento" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "is_mais_vendido" BOOLEAN NOT NULL DEFAULT false;

-- Criar índices para melhorar performance das queries
CREATE INDEX IF NOT EXISTS "products_is_lancamento_idx" ON "products"("is_lancamento");
CREATE INDEX IF NOT EXISTS "products_is_mais_vendido_idx" ON "products"("is_mais_vendido");

-- Comentários
COMMENT ON COLUMN "products"."is_lancamento" IS 'Marca produto como lançamento (aparece na seção Lançamentos da Home)';
COMMENT ON COLUMN "products"."is_mais_vendido" IS 'Marca produto como mais vendido (aparece na aba Mais Vendidos)';
