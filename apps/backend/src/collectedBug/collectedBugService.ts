import { collectedBugRepository } from './collectedBugRepository.js';

export const collectedBugService = {
  getAll() {
    return collectedBugRepository.findAll();
  },

  add(input:  {userId: number; bugId: number}) {
    return collectedBugRepository.create(input);
  },

  remove(id: number) {
    return collectedBugRepository.remove(id);
  }
};