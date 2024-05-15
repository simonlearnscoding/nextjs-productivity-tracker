-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "end" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SessionPartial" ALTER COLUMN "end" DROP NOT NULL;
