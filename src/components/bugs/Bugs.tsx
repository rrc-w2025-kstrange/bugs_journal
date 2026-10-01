import { useState } from "react";
import type { Bug } from "../../types/bug";
import { bugData } from "../../data/bugData";
import { AddBugForm } from "./AddBugForm";
import { BugList } from "./BugList";
import "./Bugs.css";

/**
 * Feature Page 
 * purpose: let an admin manage a list of exotic bugs, grouped under a fixed set of categories.
 */
export function Bugs() {
    const [bugs, updateBugs] = useState<Bug[]>(bugData);

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