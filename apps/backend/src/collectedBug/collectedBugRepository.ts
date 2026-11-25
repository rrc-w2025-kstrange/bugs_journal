import { prisma } from '../db/prisma.js';
import type { CollectedBug } from '../generated/prisma/client.js';

export const collectedBugRepository = {
  findAll: async (): Promise<CollectedBug[]> => {
    return prisma.collectedBug.findMany();
  },
  create: async (data: Omit<CollectedBug, 'id'>): Promise<CollectedBug> => {
    return prisma.collectedBug.create({ data });
  },
  delete: async (id: number): Promise<CollectedBug> => {
    return prisma.collectedBug.delete({ where: { id } });
  }
};