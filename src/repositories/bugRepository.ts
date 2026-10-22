import type { Bug } from "../types/bug";
import { bugData } from "../data/bugData";

let bugs = [...bugData];

export const bugRepository = {
    getAll(): Bug[] {
        return [...bugs];
    },

    create(bug: Bug): Bug {
        bugs = [...bugs, bug];
        return bug;
    },

    delete(id: number): boolean {
        const remainingBugs = bugs.filter(bug => bug.id !== id);

        if (remainingBugs.length === bugs.length) {
            return false;
        }

        bugs = remainingBugs;
        return true;
    }
};
