/*
  Warnings:

  - The primary key for the `CompanyInvite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recipientId` on the `CompanyInvite` table. All the data in the column will be lost.
  - The primary key for the `CompanyMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CompanyMember` table. All the data in the column will be lost.
  - Added the required column `recipientEmail` to the `CompanyInvite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyInvite" DROP CONSTRAINT "CompanyInvite_recipientId_fkey";

-- AlterTable
ALTER TABLE "CompanyInvite" DROP CONSTRAINT "CompanyInvite_pkey",
DROP COLUMN "recipientId",
ADD COLUMN     "recipientEmail" TEXT NOT NULL,
ADD CONSTRAINT "CompanyInvite_pkey" PRIMARY KEY ("senderId", "recipientEmail", "companyId");

-- AlterTable
ALTER TABLE "CompanyMember" DROP CONSTRAINT "CompanyMember_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CompanyMember_pkey" PRIMARY KEY ("userId", "companyId");
