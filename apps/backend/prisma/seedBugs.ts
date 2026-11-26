import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!
});

const prisma = new PrismaClient({ adapter });

const bugs = [
  { name: "Luna Moth", scientificName: "Actias luna", category: "Moths" },
  { name: "Atlas Moth", scientificName: "Attacus atlas", category: "Moths" },
  { name: "Carpenter Ant", scientificName: "Camponotus novaboracensis", category: "Ants" },
  { name: "Blue Morpho Butterfly", scientificName: "Morpho menelaus", category: "Butterflies" },
  { name: "Chilean Bumblebee", scientificName: "Bombus dahlbomii", category: "Bees" },
  { name: "Chilean Rose Tarantula", scientificName: "Grammostola rosea", category: "Arachnids" },
  { name: "Goliath Beetle", scientificName: "Goliathus goliatus", category: "Beetles" },
  { name: "Jewel Beetle", scientificName: "Chrysochroa fulgidissima", category: "Beetles" },
  { name: "Ghostly Silkmoth", scientificName: "Ceranchia apollina", category: "Moths" },
  { name: "Death's-head Hawkmoth", scientificName: "Acherontia atropos", category: "Moths" }
];

async function main() {
  await prisma.bug.deleteMany();
  await prisma.bug.createMany({ data: bugs });
  console.log(`Seeded ${bugs.length} bugs.`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });