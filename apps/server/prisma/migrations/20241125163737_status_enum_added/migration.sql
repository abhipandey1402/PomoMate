/*
  Warnings:

  - The `status` column on the `Timer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `status` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('notStarted', 'inProgress', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "TimerStatus" AS ENUM ('active', 'paused', 'completed', 'cancelled');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "status",
ADD COLUMN     "status" "TaskStatus" NOT NULL;

-- AlterTable
ALTER TABLE "Timer" DROP COLUMN "status",
ADD COLUMN     "status" "TimerStatus" NOT NULL DEFAULT 'active';
