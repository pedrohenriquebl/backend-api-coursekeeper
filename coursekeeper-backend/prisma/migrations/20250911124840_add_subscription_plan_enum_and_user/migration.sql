-- CreateEnum
CREATE TYPE "public"."SubscriptionPlan" AS ENUM ('FREE', 'GOLD', 'PLATINUM');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "subscriptionPlan" "public"."SubscriptionPlan" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "subscriptionValidUntil" TIMESTAMP(3);
