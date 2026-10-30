import { useState } from "react";
import type { CollectedBug } from "../types/collectedBug";
import { bugService } from "../services/bugService";

export function useCollection() {
    const [collectedBugs, setCollectedBugs] = useState<CollectedBug[]>(bugService.getCollectedBugs());

    const addBug = (newBug: CollectedBug) => {
        setCollectedBugs(bugService.addCollectedBug(newBug));
    };

    const removeBug = (id: number) => {
        setCollectedBugs(bugService.removeCollectedBug(id));
    };

    return { collectedBugs, addBug, removeBug };
}