-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order_id" TEXT NOT NULL,
    "mercado_pago_id" TEXT,
    "preference_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "amount" REAL NOT NULL,
    "payment_method" TEXT NOT NULL,
    "payment_method_id" TEXT,
    "transaction_amount" REAL,
    "net_amount" REAL,
    "mercado_pago_fee" REAL,
    "payer_email" TEXT,
    "payer_document" TEXT,
    "payer_name" TEXT,
    "external_reference" TEXT,
    "description" TEXT,
    "pix_qr_code" TEXT,
    "pix_qr_code_base64" TEXT,
    "boleto_url" TEXT,
    "boleto_barcode" TEXT,
    "approved_at" DATETIME,
    "expires_at" DATETIME,
    "webhook_notifications" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_order_id_key" ON "payments"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_mercado_pago_id_key" ON "payments"("mercado_pago_id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_preference_id_key" ON "payments"("preference_id");
