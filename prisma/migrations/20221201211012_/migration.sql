/*
  Warnings:

  - You are about to drop the column `companyRole` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'COMPANY_MEMBER', 'COMPANY_ADMIN', 'ADMIN');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "companyRole",
ADD COLUMN     "roles" "Role"[] DEFAULT ARRAY['USER']::"Role"[];

-- DropEnum
DROP TYPE "CompanyRole";
