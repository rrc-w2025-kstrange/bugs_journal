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
        updateBugs
    }: {
        bugs: Bug[],
        updateBugs: React.Dispatch<React.SetStateAction<Bug[]>>
    }) {
    return (
        <>
            <header>
                <h1>Bugs List</h1>
                <span>Add new bugs or remove old ones from the journal.</span>
            </header>
            <main>
                <AddBugForm bugs={bugs} updateBugs={updateBugs} />
                <BugList bugs={bugs} updateBugs={updateBugs} />
            </main>
        </>
    );
}

export default Bugs;