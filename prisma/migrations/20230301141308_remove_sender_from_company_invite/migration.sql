/*
  Warnings:

  - The primary key for the `CompanyInvite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `senderId` on the `CompanyInvite` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompanyInvite" DROP CONSTRAINT "CompanyInvite_senderId_fkey";

-- AlterTable
ALTER TABLE "CompanyInvite" DROP CONSTRAINT "CompanyInvite_pkey",
DROP COLUMN "senderId",
ADD CONSTRAINT "CompanyInvite_pkey" PRIMARY KEY ("recipientEmail", "companyId");
