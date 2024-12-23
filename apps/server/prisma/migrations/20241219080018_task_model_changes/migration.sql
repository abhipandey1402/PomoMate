-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "isBeingWorkedOn" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTaskStarred" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "remainingTime" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sharedWithUserIds" TEXT[],
ADD COLUMN     "timeWorked" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "timeWorkedToday" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "timerEndTime" TIMESTAMP(3),
ADD COLUMN     "timerStartTime" TIMESTAMP(3),
ADD COLUMN     "totalTimeRequired" INTEGER;
