import { prisma } from '../db/prisma.js';

export const collectedBugRepository = {
  findAll: async () => {
    const rows = await prisma.collectedBug.findMany({
      include: { bug: true }
    });
    // Map the nested bug data to the top level for the frontend
    return rows.map(row => ({
      id: row.id,
      userId: row.userId,
      bugId: row.bugId,
      dateCollected: row.dateCollected.toISOString(),
      name: row.bug.name,
      scientificName: row.bug.scientificName,
      category: row.bug.category
    }));
  },

  create: async (data: { userId: number; bugId: number }) => {
    const row = await prisma.collectedBug.create({
      data: {
        userId: data.userId,
        bugId: data.bugId,
      },
      include: { bug: true }
    });
    // Map the nested bug data to the top level for the frontend
    return {
      id: row.id,
      userId: row.userId,
      bugId: row.bugId,
      dateCollected: row.dateCollected.toISOString(),
      name: row.bug.name,
      scientificName: row.bug.scientificName,
      category: row.bug.category
    };
  },

  remove: async (id: number) => {
    const result = await prisma.collectedBug.deleteMany({
      where: { id }
    });
    return result.count > 0; 
  }
};