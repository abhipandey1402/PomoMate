-- AlterTable
ALTER TABLE "Timer" ADD COLUMN     "remainingTime" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ALTER COLUMN "completed" SET DEFAULT false;
