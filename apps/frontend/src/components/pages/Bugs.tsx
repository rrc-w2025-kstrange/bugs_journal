import type { CreateBugInput } from "../../types/bug";
import { useBugs } from "../../hooks/useBugs";
import { bugService } from "../../services/bugService";
import { AddBugForm } from "../common/add-bug-form/AddBugForm";
import { BugList } from "../common/bug-list/BugList";
import "./Bugs.css";

/**
 * Feature Page
 * purpose: let an admin manage a list of exotic bugs, grouped under a fixed set of categories.
 * The bugs come from the useBugs hook, which asks bugService, which asks
 * bugRepository. This replaces passing the bugs down from App as props.
 * The count is still received from App because the other pages share it.
 */
export function Bugs({
        bugCount,
        setBugCount
    }: {
        bugCount: number,
        setBugCount: React.Dispatch<React.SetStateAction<number>>
    }) {
    const { bugs, loading, error, addBug, removeBug } = useBugs();

    async function handleAdd(input: CreateBugInput): Promise<boolean> {
        const added = await addBug(input);

        if (added) {
            setBugCount(oldCount => bugService.adjustCount(oldCount, 1));
        }

        return added;
    }

    async function handleRemove(id: number): Promise<void> {
        const removed = await removeBug(id);

        if (removed) {
            setBugCount(oldCount => bugService.adjustCount(oldCount, -1));
        }
    }

    return (
        <>
            <header>
                <h1>Bugs List</h1>
                <span>Add new bugs or remove old ones from the journal.</span>
            </header>
            <main>
                <p>Total Bugs Discovered: {bugCount}</p>
                <AddBugForm onAdd={handleAdd} />
                {error && <p className="form-error" role="alert">{error}</p>}
                {loading ? (
                    <p>Loading bugs...</p>
                ) : (
                    <BugList bugs={bugs} onRemove={handleRemove} />
                )}
            </main>
        </>
    );
}

export default Bugs;