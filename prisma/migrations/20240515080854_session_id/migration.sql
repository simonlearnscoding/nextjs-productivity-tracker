/*
  Warnings:

  - You are about to drop the column `SessionId` on the `SessionPartial` table. All the data in the column will be lost.
  - Added the required column `sessionId` to the `SessionPartial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SessionPartial" DROP CONSTRAINT "SessionPartial_SessionId_fkey";

-- AlterTable
ALTER TABLE "SessionPartial" DROP COLUMN "SessionId",
ADD COLUMN     "sessionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SessionPartial" ADD CONSTRAINT "SessionPartial_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
