import { collectedBugRepository } from './collectedBugRepository.js';

export const collectedBugService = {
  getBugs: async () => await collectedBugRepository.findAll(),
  addBug: async (data: any) => {
    // Convert the string date from frontend to a Date object for Prisma
    const formattedData = {
      ...data,
      dateCollected: new Date(data.dateCollected)
    };
    return await collectedBugRepository.create(formattedData);
  },
  removeBug: async (id: number) => await collectedBugRepository.delete(id)
};