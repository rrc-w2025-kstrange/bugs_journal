import { prisma } from "../db/prisma";
import type { Bug, CreateBugInput } from "../types/bug";

// The database stores a missing scientific name as null.
// The Bug type leaves it out instead, so its converted here.
function toBug(row: {
  id: number;
  name: string;
  scientificName: string | null;
  category: string;
}): Bug {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    ...(row.scientificName !== null
      ? { scientificName: row.scientificName }
      : {})
  };
}

export const bugRepository = {
  async getAll(): Promise<Bug[]> {
    const bugs = await prisma.bug.findMany({
      orderBy: { id: "asc" }
    });

    return bugs.map(toBug);
  },

  async add(input: CreateBugInput): Promise<Bug> {
    const bug = await prisma.bug.create({
      data: {
        name: input.name,
        scientificName: input.scientificName || null,
        category: input.category
      }
    });

    return toBug(bug);
  },

  async remove(id: number): Promise<boolean> {
    const result = await prisma.bug.deleteMany({
      where: { id }
    });

    return result.count > 0;
  }
};