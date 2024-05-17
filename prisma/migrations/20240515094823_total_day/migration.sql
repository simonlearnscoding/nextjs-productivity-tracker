/*
  Warnings:

  - You are about to drop the `DayLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DayLog";

-- CreateTable
CREATE TABLE "Daylog" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activityId" INTEGER NOT NULL,
    "totalDuration" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Daylog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Daylog_date_userId_activityId_key" ON "Daylog"("date", "userId", "activityId");
