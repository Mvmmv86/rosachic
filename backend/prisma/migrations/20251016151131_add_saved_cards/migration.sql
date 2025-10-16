-- CreateTable
CREATE TABLE "saved_cards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "card_token" TEXT NOT NULL,
    "last_four_digits" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "expiration_month" TEXT NOT NULL,
    "expiration_year" TEXT NOT NULL,
    "holder_name" TEXT NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "saved_cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
