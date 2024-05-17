-- AlterTable
ALTER TABLE "DayLog" ALTER COLUMN "duration" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "activeDuration" INTEGER NOT NULL DEFAULT 0;
