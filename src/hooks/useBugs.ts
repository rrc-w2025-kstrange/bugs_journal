import { useEffect, useState } from "react";
import { bugService } from "../services/bugService";
import type { Bug, CreateBugInput } from "../types/bug";

/**
 * Custom hook for the shared list of bugs.
 * It asks the bug service for the data and keeps it in state for the page.
 * It doesn't decide what a valid bug is, that's business logic and stays in the service.
 *
 * @returns {
 *  bugs: the list of bugs to show on the page.
 *  loading: true while the bugs are still being loaded.
 *  error: an error message if something went wrong, otherwise null.
 *  addBug: method that asks the service to add a bug, returns true if it worked.
 *  removeBug: method that asks the service to remove a bug by its ID, returns true if it worked.
 * }
 */
export function useBugs() {
    const [bugs, setBugs] = useState<Bug[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;

        async function loadBugs() {
            try {
                const bugs = await bugService.getBugs();

                if (!ignore) {
                    setBugs(bugs);
                }
            } catch {
                if (!ignore) {
                    setError("Unable to load bugs.");
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        loadBugs();

        return () => {
            ignore = true;
        };
    }, []);

    async function addBug(input: CreateBugInput): Promise<boolean> {
        setError(null);

        try {
            const bug = await bugService.addBug(input);

            setBugs((current) => [...current, bug]);

            return true;
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Unable to add bug.",
            );

            return false;
        }
    }

    async function removeBug(id: number): Promise<boolean> {
        setError(null);

        try {
            await bugService.removeBug(id);

            setBugs((current) => current.filter((bug) => bug.id !== id));

            return true;
        } catch (error) {
            setError(
                error instanceof Error ? error.message : "Unable to remove bug.",
            );

            return false;
        }
    }

    return {
        bugs,
        loading,
        error,
        addBug,
        removeBug,
    };
}