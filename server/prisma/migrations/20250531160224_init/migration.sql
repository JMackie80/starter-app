-- AlterTable
ALTER TABLE "User" ADD COLUMN "deletedAt" DATETIME;
ALTER TABLE "User" ADD COLUMN "lockedAt" DATETIME;

-- CreateIndex
CREATE INDEX "ix_user_email" ON "User"("email", "deletedAt");

-- CreateIndex
CREATE INDEX "ix_user_deletedAt" ON "User"("deletedAt");

-- CreateIndex
CREATE INDEX "ix_userProfile_modifiedAt" ON "UserProfile"("modifiedAt");
