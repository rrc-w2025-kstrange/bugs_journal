import { useState } from "react";
import type { Bug } from "../../types/bug";
import { bugCategories } from "../../data/bugCategories";

/**
 * Receives the current bug list and its setter as props.
 */
export function AddBugForm({
        bugs,
        updateBugs
    }: {
        bugs: Bug[],
        updateBugs: React.Dispatch<React.SetStateAction<Bug[]>>
    }) {
    const [nameValue, setNameValue] = useState<string>("");
    const [scientificNameValue, setScientificNameValue] = useState<string>("");
    const [categoryValue, setCategoryValue] = useState<string>(bugCategories[0]);

    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        setErrorMessage("");

        if (nameValue.trim().length < 3) {
            setErrorMessage("Bug name must be at least 3 characters.");
            return;
        }

        if (!bugCategories.includes(categoryValue)) {
            setErrorMessage("Please select an existing category.");
            return;
        }

        const newId = bugs.length > 0
            ? Math.max(...bugs.map(b => b.id)) + 1
            : 0;

        const newBug: Bug = {
            id: newId,
            name: nameValue.trim(),
            scientificName: scientificNameValue.trim() || undefined,
            category: categoryValue
        };

        updateBugs(oldBugs => [...oldBugs, newBug]);

        setNameValue("");
        setScientificNameValue("");
        setCategoryValue(bugCategories[0]);
    };

    return (
        <form className="add-bug-form" onSubmit={handleSubmit}>
            <h2>Add a Bug</h2>

            {/* Only renders when there's an actual message to show. */}
            {errorMessage && (
                <p className="form-error">{errorMessage}</p>
            )}

            <input
                type="text"
                name="bug-name"
                placeholder="Bug name..."
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
            />

            <input
                type="text"
                name="bug-scientific-name"
                placeholder="Scientific name (optional)..."
                value={scientificNameValue}
                onChange={e => setScientificNameValue(e.target.value)}
            />

            <select
                name="bug-category"
                value={categoryValue}
                onChange={e => setCategoryValue(e.target.value)}
            >
                {bugCategories.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <input type="submit" value="Add Bug" />
        </form>
    );
}