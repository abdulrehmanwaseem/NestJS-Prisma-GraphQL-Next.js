-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isTwoFAEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twoFASecret" TEXT;
