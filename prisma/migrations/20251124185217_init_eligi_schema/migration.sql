/*
  Warnings:

  - You are about to drop the column `segment` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Business` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Business` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "segment",
DROP COLUMN "state",
DROP COLUMN "zipCode",
ALTER COLUMN "onboardingStep" SET DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "Business_ownerId_key" ON "Business"("ownerId");
