import { useState, useEffect } from "react";
import type { CollectedBug, NewCollectedBug } from "../types/collectedBug";
import { collectionRepository } from "../repositories/collectionRepository";

export function useCollection() {
    const [collectedBugs, setCollectedBugs] = useState<CollectedBug[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        collectionRepository.getCollectedBugs()
            .then((data) => setCollectedBugs(data))
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);

    const addBug = async (newBug: NewCollectedBug) => {
        try {
            const savedBug = await collectionRepository.addCollectedBug(newBug);
            setCollectedBugs(prev => [...prev, savedBug]);
        } catch (error) {
            console.error("Error adding bug:", error);
        }
    };

    const removeBug = async (id: number) => {
        try {
            await collectionRepository.removeCollectedBug(id);
            setCollectedBugs(prev => prev.filter(bug => bug.id !== id));
        } catch (error) {
            console.error("Error deleting bug:", error);
        }
    };

    return { collectedBugs, isLoading, addBug, removeBug };
}