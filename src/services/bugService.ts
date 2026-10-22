import { bugCategories } from "../data/bugCategories";
import type { Bug } from "../types/bug";

export interface NewBugDetails {
    name: string;
    scientificName: string;
    category: string;
}

interface BugCreationResult {
    bug?: Bug;
    error?: string;
}

export function createBug(
    details: NewBugDetails,
    existingBugs: Bug[]
): BugCreationResult {
    const name = details.name.trim();
    const scientificName = details.scientificName.trim();

    if (name.length < 3) {
        return { error: "Bug name must be at least 3 characters." };
    }

    if (!bugCategories.includes(details.category)) {
        return { error: "Please select an existing category." };
    }

    const nextId = existingBugs.length > 0
        ? Math.max(...existingBugs.map(bug => bug.id)) + 1
        : 0;

    return {
        bug: {
            id: nextId,
            name,
            scientificName: scientificName || undefined,
            category: details.category
        }
    };
}
