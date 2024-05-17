-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "daylogId" INTEGER;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_daylogId_fkey" FOREIGN KEY ("daylogId") REFERENCES "Daylog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
