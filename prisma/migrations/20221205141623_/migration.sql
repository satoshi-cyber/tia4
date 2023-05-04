/*
  Warnings:

  - You are about to drop the column `resume` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resume",
ADD COLUMN     "bio" TEXT;
