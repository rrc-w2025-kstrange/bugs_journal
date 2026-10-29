import type { Bug } from "../types/bug";
import { bugData } from "../data/bugData";

export const bugRepository = {
    // Reads it
    getAllBugs(): Bug[] {
        return bugData;
    },

    // Create
    addBug: (newBug: Bug): Bug[] => {
        return [...bugData, newBug];
    },

    // Delete
    deleteBug: (id: number): Bug[] => {
        return bugData.filter(bug => bug.id !== id);
    }
};