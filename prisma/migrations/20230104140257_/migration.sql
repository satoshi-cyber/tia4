/*
  Warnings:

  - A unique constraint covering the columns `[intervieweeId,jobId]` on the table `Interview` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Interview_intervieweeId_jobId_key" ON "Interview"("intervieweeId", "jobId");
