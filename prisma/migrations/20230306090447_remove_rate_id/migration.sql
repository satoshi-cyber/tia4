/*
  Warnings:

  - The primary key for the `Rate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Rate` table. All the data in the column will be lost.
  - Made the column `interviewId` on table `Rate` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Rate" DROP CONSTRAINT "Rate_interviewId_fkey";

-- AlterTable
ALTER TABLE "Rate" DROP CONSTRAINT "Rate_pkey",
DROP COLUMN "id",
ALTER COLUMN "interviewId" SET NOT NULL,
ADD CONSTRAINT "Rate_pkey" PRIMARY KEY ("raterId", "interviewId");

-- AddForeignKey
ALTER TABLE "Rate" ADD CONSTRAINT "Rate_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
