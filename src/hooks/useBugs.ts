import { useState, useEffect } from "react";
import { bugRepository } from "../repositories/bugRepository";
import type { Bug } from "../types/bug";

export function useBugs() {
    const [bugs, setBugs] = useState<Bug[]>([]);

    // loads data from the repo when the hook gets mounted
    useEffect(() => {
        const loadedBugs = bugRepository.getAllBugs();
        setBugs(loadedBugs);
    }, []);

    return { bugs, setBugs };
}