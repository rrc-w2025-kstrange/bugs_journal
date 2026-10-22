import { useState } from "react";
import { bugRepository } from "../repositories/bugRepository";
import { createBug, type NewBugDetails } from "../services/bugService";
import type { Bug } from "../types/bug";

/**
 * Owns the shared bug collection state and exposes operations for bug pages.
 *
 * @returns
 * - `bugs`: The current collection of bugs displayed by the page.
 * - `addBug`: Validates and persists a new bug, returning an error message
 *   when the business rules reject it.
 * - `removeBug`: Removes a bug by ID and refreshes the displayed collection.
 */
export function useBugs() {
    const [bugs, setBugs] = useState<Bug[]>(() => bugRepository.getAll());

    function addBug(details: NewBugDetails): string | undefined {
        const result = createBug(details, bugRepository.getAll());

        if (!result.bug) {
            return result.error;
        }

        bugRepository.create(result.bug);
        setBugs(bugRepository.getAll());
        return undefined;
    }

    function removeBug(id: number): void {
        if (bugRepository.delete(id)) {
            setBugs(bugRepository.getAll());
        }
    }

    return {
        bugs,
        addBug,
        removeBug
    };
}
