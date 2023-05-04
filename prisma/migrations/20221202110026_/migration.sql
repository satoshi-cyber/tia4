/*
  Warnings:

  - You are about to drop the column `candidateId` on the `Rate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rate" DROP CONSTRAINT "Rate_candidateId_fkey";

-- AlterTable
ALTER TABLE "Rate" DROP COLUMN "candidateId";
