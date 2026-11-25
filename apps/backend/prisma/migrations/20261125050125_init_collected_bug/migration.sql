-- CreateTable
CREATE TABLE "CollectedBug" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "commonName" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "habitat" TEXT NOT NULL,
    "dateCollected" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectedBug_pkey" PRIMARY KEY ("id")
);
