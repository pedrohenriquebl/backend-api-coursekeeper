-- CreateEnum
CREATE TYPE "public"."Topic" AS ENUM ('FRONTEND', 'BACKEND', 'DEVOPS', 'FULLSTACK', 'MOBILE', 'DATASCIENCE', 'DESIGN', 'OUTROS');

-- CreateEnum
CREATE TYPE "public"."Platform" AS ENUM ('EDX', 'UDEMY', 'ALURA', 'ROCKETSEAT', 'COURSERA', 'VUEMASTERY', 'YOUTUBE', 'OUTROS');

-- CreateEnum
CREATE TYPE "public"."CourseStatus" AS ENUM ('NAO_INICIADO', 'EM_PROGRESSO', 'CONCLUIDO');

-- CreateEnum
CREATE TYPE "public"."GoalType" AS ENUM ('HORAS_TOTAIS', 'HORAS_TOPICO', 'CURSOS_CONCLUIDOS', 'PERIODO_ESTUDO');

-- CreateEnum
CREATE TYPE "public"."GoalStatus" AS ENUM ('ATIVA', 'CONCLUIDA', 'VENCIDA');

-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('PORTUGUES', 'ENGLISH', 'OUTROS');

-- CreateTable
CREATE TABLE "public"."Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "platform" "public"."Platform" NOT NULL,
    "platformCustom" TEXT,
    "duration" TEXT NOT NULL,
    "topic" "public"."Topic" NOT NULL,
    "topicCustom" TEXT,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT,
    "status" "public"."CourseStatus" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT,
    "instructor" TEXT,
    "language" "public"."Language",
    "languageCustom" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Goal" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" "public"."GoalType" NOT NULL,
    "target" INTEGER NOT NULL,
    "current" INTEGER NOT NULL DEFAULT 0,
    "unit" TEXT NOT NULL,
    "topic" "public"."Topic",
    "deadline" TIMESTAMP(3) NOT NULL,
    "status" "public"."GoalStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "description" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
