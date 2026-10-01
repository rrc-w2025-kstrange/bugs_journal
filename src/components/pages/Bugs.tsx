import type { Bug } from "../../types/bug";
import { AddBugForm } from "../common/add-bug-form/AddBugForm";
import { BugList } from "../common/bug-list/BugList";
import "./Bugs.css";

/**
 * Feature Page
 * purpose: let an admin manage a list of exotic bugs, grouped under a fixed set of categories.
 * the bugs and their setter are received as props from App.
 */
export function Bugs({
        bugs,
        updateBugs,
        bugCount,
        setBugCount
    }: {
        bugs: Bug[],
        updateBugs: React.Dispatch<React.SetStateAction<Bug[]>>,
        bugCount: number,
        setBugCount: React.Dispatch<React.SetStateAction<number>>
    }) {
    return (
        <>
            <header>
                <h1>Bugs List</h1>
                <span>Add new bugs or remove old ones from the journal.</span>
            </header>
            <main>
                <p>Total Bugs Discovered: {bugCount}</p>
                <AddBugForm bugs={bugs} updateBugs={updateBugs} setBugCount={setBugCount} />
                <BugList bugs={bugs} updateBugs={updateBugs} setBugCount={setBugCount} />
            </main>
        </>
    );
}

export default Bugs;