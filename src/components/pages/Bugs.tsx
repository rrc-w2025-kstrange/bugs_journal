import { AddBugForm } from "../common/add-bug-form/AddBugForm";
import { BugList } from "../common/bug-list/BugList";
import { useBugs } from "../../hooks/useBugs";
import "./Bugs.css";

/**
 * Feature Page
 * purpose: let an admin manage a list of exotic bugs, grouped under a fixed set of categories.
 * the bugs and their setter are received as props from App.
 */
export function Bugs() {
    const { bugs, addBug, removeBug } = useBugs();

    return (
        <>
            <header>
                <h1>Bugs List</h1>
                <span>Add new bugs or remove old ones from the journal.</span>
            </header>
            <main>
                <AddBugForm onAddBug={addBug} />
                <BugList bugs={bugs} onRemoveBug={removeBug} />
            </main>
        </>
    );
}

export default Bugs;