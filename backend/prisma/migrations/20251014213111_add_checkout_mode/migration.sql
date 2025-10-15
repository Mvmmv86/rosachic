-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mercadopago_config" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "checkout_mode" TEXT NOT NULL DEFAULT 'INTERNAL',
    "public_key" TEXT NOT NULL DEFAULT '',
    "access_token" TEXT NOT NULL DEFAULT '',
    "webhook_secret" TEXT,
    "is_production" BOOLEAN NOT NULL DEFAULT false,
    "notification_url" TEXT,
    "success_url" TEXT NOT NULL DEFAULT '/checkout/sucesso',
    "failure_url" TEXT NOT NULL DEFAULT '/checkout/falha',
    "pending_url" TEXT NOT NULL DEFAULT '/checkout/pendente',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_mercadopago_config" ("access_token", "created_at", "failure_url", "id", "is_production", "notification_url", "pending_url", "public_key", "success_url", "updated_at", "webhook_secret") SELECT "access_token", "created_at", "failure_url", "id", "is_production", "notification_url", "pending_url", "public_key", "success_url", "updated_at", "webhook_secret" FROM "mercadopago_config";
DROP TABLE "mercadopago_config";
ALTER TABLE "new_mercadopago_config" RENAME TO "mercadopago_config";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
