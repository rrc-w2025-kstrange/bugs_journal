import { useState, useEffect } from "react";
import type { CollectedBug, NewCollectedBug } from "../types/collectedBug";
import { bugService } from "../services/bugService"; 

export function useCollection() {
    const [collectedBugs, setCollectedBugs] = useState<CollectedBug[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBugs = async () => {
        try {
            // this will call the service layer instead of the repository
            const data = await bugService.getCollectedBugs();
            setCollectedBugs(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBugs();
    }, []);

    const addBug = async (newBug: NewCollectedBug) => {
        try {
            await bugService.addCollectedBug(newBug);
            await fetchBugs(); // Refresh the list after adding
        } catch (error) {
            console.error("Error adding bug:", error);
        }
    };

    const removeBug = async (id: number) => {
        try {
            await bugService.removeCollectedBug(id);
            await fetchBugs(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting bug:", error);
        }
    };

    return { collectedBugs, isLoading, addBug, removeBug };
}