import type { CollectedBug } from "../types/collectedBug";
import { collectedBugData } from "../data/collectedBugData";

let collectedBugs: CollectedBug[] = collectedBugData.map((bug) => ({ ...bug }));

export const collectionRepository = {
  getCollectedBugs: (): CollectedBug[] => {
    return collectedBugs; 
  },
  addCollectedBug: (newBug: CollectedBug): CollectedBug[] => {
    // This updates the memory bank with the new bug
    collectedBugs = [...collectedBugs, newBug]; 
    return collectedBugs;
  },
  removeCollectedBug: (id: number): CollectedBug[] => {
    // This updates the memory bank by removing the bug
    collectedBugs = collectedBugs.filter((bug) => bug.id !== id);
    return collectedBugs;
  }
};