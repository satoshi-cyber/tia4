-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('initialized', 'proccessing', 'ready');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "status" "InterviewStatus" NOT NULL DEFAULT 'initialized';
