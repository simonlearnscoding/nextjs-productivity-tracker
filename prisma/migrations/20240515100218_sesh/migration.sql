/*
  Warnings:

  - You are about to drop the column `activeDuration` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "activeDuration",
ADD COLUMN     "totalDuration" INTEGER NOT NULL DEFAULT 0;
