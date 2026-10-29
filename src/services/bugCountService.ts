import { bugCountRepository } from "../repositories/bugCountRepository";

export const bugCountService = {
  getCount(): number {
    return bugCountRepository.get();
  },

  increment(): void {
    bugCountRepository.set(
      bugCountRepository.get() + 1,
    );
  },

  decrement(): void {
    bugCountRepository.set(
      Math.max(0, bugCountRepository.get() - 1),
    );
  },
};
