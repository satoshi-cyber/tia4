-- DropIndex
DROP INDEX "Company_website_key";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL;
