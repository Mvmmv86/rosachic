-- CreateTable
CREATE TABLE "mercadopago_config" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "public_key" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "webhook_secret" TEXT,
    "is_production" BOOLEAN NOT NULL DEFAULT false,
    "notification_url" TEXT,
    "success_url" TEXT NOT NULL DEFAULT '/checkout/sucesso',
    "failure_url" TEXT NOT NULL DEFAULT '/checkout/falha',
    "pending_url" TEXT NOT NULL DEFAULT '/checkout/pendente',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
