-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vocabulary" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "language" VARCHAR(10) NOT NULL,
    "word" VARCHAR(255) NOT NULL,
    "note" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "vocabulary_user_id_idx" ON "vocabulary"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "vocabulary_user_id_language_word_key" ON "vocabulary"("user_id", "language", "word");

-- AddForeignKey
ALTER TABLE "vocabulary" ADD CONSTRAINT "vocabulary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
