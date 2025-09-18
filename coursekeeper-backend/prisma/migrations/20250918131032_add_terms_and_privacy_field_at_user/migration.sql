-- DropIndex
DROP INDEX "public"."User_password_key";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "acceptedPrivacyAt" TIMESTAMP(3),
ADD COLUMN     "acceptedTermsAt" TIMESTAMP(3);
