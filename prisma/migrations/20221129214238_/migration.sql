/*
  Warnings:

  - You are about to drop the column `userId` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Rate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,interviewId]` on the table `Rate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[issuer]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[publicAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `intervieweeId` to the `Interview` table without a default value. This is not possible if the table is not empty.
  - Made the column `companyId` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `interviewId` to the `Rate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issuer` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CompanyRole" AS ENUM ('MEMBER', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rate" DROP CONSTRAINT "Rate_jobId_fkey";

-- DropIndex
DROP INDEX "Rate_jobId_key";

-- DropIndex
DROP INDEX "Rate_userId_key";

-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "userId",
ADD COLUMN     "intervieweeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "companyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Rate" DROP COLUMN "jobId",
ADD COLUMN     "interviewId" TEXT NOT NULL,
ADD CONSTRAINT "Rate_pkey" PRIMARY KEY ("userId", "interviewId");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "companyRole" "CompanyRole",
ADD COLUMN     "issuer" TEXT NOT NULL,
ADD COLUMN     "publicAddress" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rate_userId_interviewId_key" ON "Rate"("userId", "interviewId");

-- CreateIndex
CREATE UNIQUE INDEX "User_issuer_key" ON "User"("issuer");

-- CreateIndex
CREATE UNIQUE INDEX "User_publicAddress_key" ON "User"("publicAddress");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_intervieweeId_fkey" FOREIGN KEY ("intervieweeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
