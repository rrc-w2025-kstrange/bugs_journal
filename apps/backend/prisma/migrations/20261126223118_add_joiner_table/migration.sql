/*
  Warnings:

  - You are about to drop the column `speciesID` on the `CollectedBug` table. All the data in the column will be lost.
  - You are about to drop the `Species` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,bugId]` on the table `CollectedBug` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bugId` to the `CollectedBug` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CollectedBug" DROP CONSTRAINT "CollectedBug_speciesID_fkey";

-- AlterTable
ALTER TABLE "CollectedBug" DROP COLUMN "speciesID",
ADD COLUMN     "bugId" INTEGER NOT NULL,
ALTER COLUMN "dateCollected" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Species";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollectedBug_userId_bugId_key" ON "CollectedBug"("userId", "bugId");

-- AddForeignKey
ALTER TABLE "CollectedBug" ADD CONSTRAINT "CollectedBug_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectedBug" ADD CONSTRAINT "CollectedBug_bugId_fkey" FOREIGN KEY ("bugId") REFERENCES "Bug"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
