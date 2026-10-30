import type { CollectedBug } from "../types/collectedBug";
import { collectedBugData } from "../data/collectedBugData";

export const collectionRepository = {
    getCollectedBugs: (): CollectedBug[] => {
        return collectedBugData;
    },

    addCollectedBug: (newBug: CollectedBug): CollectedBug[] => {
        return [...collectedBugData, newBug];
    },

    removeCollectedBug: (id: number): CollectedBug[] => {
        return collectedBugData.filter((bug) => bug.id !== id);
    }
};