import { useState } from "react";
import type { CollectedBug } from "../types/collectedBug";
import { collectionRepository } from "../repositories/collectionRepository";

export function useCollection() {
    const [collectedBugs, setCollectedBugs] = useState<CollectedBug[]>(collectionRepository.getCollectedBugs());

    const addBug = (newBug: CollectedBug) => {
        setCollectedBugs(collectionRepository.addCollectedBug(newBug));
    };

    const removeBug = (id: number) => {
        setCollectedBugs(collectionRepository.removeCollectedBug(id));
    };

    return { collectedBugs, addBug, removeBug };
}