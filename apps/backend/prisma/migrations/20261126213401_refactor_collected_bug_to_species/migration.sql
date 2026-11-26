/*
  Warnings:

  - You are about to drop the column `commonName` on the `CollectedBug` table. All the data in the column will be lost.
  - You are about to drop the column `habitat` on the `CollectedBug` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `CollectedBug` table. All the data in the column will be lost.
  - You are about to drop the column `scientificName` on the `CollectedBug` table. All the data in the column will be lost.
  - Added the required column `speciesID` to the `CollectedBug` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CollectedBug" DROP COLUMN "commonName",
DROP COLUMN "habitat",
DROP COLUMN "order",
DROP COLUMN "scientificName",
ADD COLUMN     "speciesID" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Species" (
    "id" SERIAL NOT NULL,
    "commonName" TEXT NOT NULL,
    "scientificName" TEXT,
    "order" TEXT NOT NULL,
    "habitat" TEXT,

    CONSTRAINT "Species_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollectedBug" ADD CONSTRAINT "CollectedBug_speciesID_fkey" FOREIGN KEY ("speciesID") REFERENCES "Species"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
