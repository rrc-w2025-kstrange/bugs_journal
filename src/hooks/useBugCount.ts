import { useSyncExternalStore } from "react";
import { bugCountRepository } from "../repositories/bugCountRepository";
import { bugCountService } from "../services/bugCountService";

/**
 * Provides the shared identified-bugs count and actions to increment or
 * decrement it across pages.
 */
export function useBugCount() {
  const bugCount = useSyncExternalStore(
    bugCountRepository.subscribe,
    bugCountService.getCount,
  );

  return {
    bugCount,
    incrementBugCount: bugCountService.increment,
    decrementBugCount: bugCountService.decrement,
  };
}
