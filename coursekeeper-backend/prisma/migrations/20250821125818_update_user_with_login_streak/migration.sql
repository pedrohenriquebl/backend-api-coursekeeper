-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "currentLoginStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "maxLoginStreak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "website" TEXT;
