import { bugRepository } from "../repositories/bugRepository";
import type { CreateBugInput } from "../types/bug";

export const bugService = {
  getAll() {
    return bugRepository.getAll();
  },

  add(input: CreateBugInput) {
    return bugRepository.add(input);
  },

  remove(id: number) {
    return bugRepository.remove(id);
  }
};