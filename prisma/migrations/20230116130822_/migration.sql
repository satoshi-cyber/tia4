/*
  Warnings:

  - You are about to drop the column `status` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "status" "InterviewStatus" NOT NULL DEFAULT 'initialized';

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "status";
