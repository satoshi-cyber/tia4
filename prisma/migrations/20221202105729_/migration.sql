/*
  Warnings:

  - You are about to drop the column `userId` on the `Rate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rate" DROP CONSTRAINT "Rate_userId_fkey";

-- AlterTable
ALTER TABLE "Rate" DROP COLUMN "userId";
