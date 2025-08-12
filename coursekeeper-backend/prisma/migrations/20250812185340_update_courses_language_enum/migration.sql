/*
  Warnings:

  - The values [ENGLISH] on the enum `Language` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Language_new" AS ENUM ('PORTUGUES', 'INGLES', 'ESPANHOL', 'FRANCES', 'OUTROS');
ALTER TABLE "public"."Course" ALTER COLUMN "language" TYPE "public"."Language_new" USING ("language"::text::"public"."Language_new");
ALTER TYPE "public"."Language" RENAME TO "Language_old";
ALTER TYPE "public"."Language_new" RENAME TO "Language";
DROP TYPE "public"."Language_old";
COMMIT;
