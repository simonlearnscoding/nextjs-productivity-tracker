-- CreateEnum
CREATE TYPE "SessionType" AS ENUM ('TRACKING', 'PLANNED', 'LOGGED');

-- CreateEnum
CREATE TYPE "SessionPartialType" AS ENUM ('WORK', 'BREAK');

-- CreateTable
CREATE TABLE "UserActivity" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "activityId" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "UserActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER,
    "type" "SessionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "activityId" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionPartial" (
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "SessionPartialType" NOT NULL,
    "activityId" INTEGER NOT NULL,
    "SessionId" INTEGER NOT NULL,

    CONSTRAINT "SessionPartial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayLog" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "DayLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "session_user_index" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "session_activity_index" ON "Session"("activityId");

-- CreateIndex
CREATE INDEX "partial_user_index" ON "SessionPartial"("userId");

-- CreateIndex
CREATE INDEX "partial_activity_index" ON "SessionPartial"("activityId");

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionPartial" ADD CONSTRAINT "SessionPartial_SessionId_fkey" FOREIGN KEY ("SessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
