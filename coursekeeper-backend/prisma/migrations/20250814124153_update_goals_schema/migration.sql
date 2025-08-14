/*
  Warnings:

  - Changed the type of `unit` on the `Goal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."GoalUnits" AS ENUM ('HORAS', 'CURSOS', 'DIAS');

-- AlterTable
ALTER TABLE "public"."Goal" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "unit",
ADD COLUMN     "unit" "public"."GoalUnits" NOT NULL;
