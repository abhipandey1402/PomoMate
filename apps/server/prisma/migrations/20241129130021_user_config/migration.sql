-- CreateTable
CREATE TABLE "UserConfig" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pomodoroTime" INTEGER NOT NULL DEFAULT 1500,
    "shortBreakTime" INTEGER NOT NULL DEFAULT 300,
    "longBreakTime" INTEGER NOT NULL DEFAULT 900,
    "autoStartBreaks" BOOLEAN NOT NULL DEFAULT false,
    "autoStartPomodoros" BOOLEAN NOT NULL DEFAULT false,
    "longBreakInterval" INTEGER NOT NULL DEFAULT 4,
    "autoCheckTasks" BOOLEAN NOT NULL DEFAULT false,
    "autoSwitchTasks" BOOLEAN NOT NULL DEFAULT true,
    "alarmSound" TEXT,
    "alarmVolume" INTEGER NOT NULL DEFAULT 50,
    "alarmRepeat" INTEGER NOT NULL DEFAULT 1,
    "tickingSound" TEXT,
    "tickingVolume" INTEGER NOT NULL DEFAULT 50,
    "colorTheme" TEXT NOT NULL DEFAULT 'red',
    "hourFormat" TEXT NOT NULL DEFAULT '24-hour',
    "darkMode" BOOLEAN NOT NULL DEFAULT false,
    "reminderTime" INTEGER,
    "mobileAlarmEnabled" BOOLEAN NOT NULL DEFAULT false,
    "integrations" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserConfig_userId_key" ON "UserConfig"("userId");

-- AddForeignKey
ALTER TABLE "UserConfig" ADD CONSTRAINT "UserConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
