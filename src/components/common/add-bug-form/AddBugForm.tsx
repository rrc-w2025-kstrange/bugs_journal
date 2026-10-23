import { useState } from "react";
import type { Bug } from "../../../types/bug";
import { bugCategories } from "../../../data/bugCategories";
import { useFieldValue } from "../../../hooks/useFieldValue";

/**
 * Receives the current bug list and its setter as props.
 */
export function AddBugForm({
        bugs,
        updateBugs,
        setBugCount
    }: {
        bugs: Bug[],
        updateBugs: React.Dispatch<React.SetStateAction<Bug[]>>,
        setBugCount: React.Dispatch<React.SetStateAction<number>>
    }) {
    const nameField = useFieldValue("");
    const scientificNameField = useFieldValue("");
    const categoryField = useFieldValue(bugCategories[0]);

    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        setErrorMessage("");

        if (nameField.value.trim().length < 3) {
            setErrorMessage("Bug name must be at least 3 characters.");
            return;
        }

        if (!bugCategories.includes(categoryField.value)) {
            setErrorMessage("Please select an existing category.");
            return;
        }

        const newId = bugs.length > 0
            ? Math.max(...bugs.map(b => b.id)) + 1
            : 0;

        const newBug: Bug = {
            id: newId,
            name: nameField.value.trim(),
            scientificName: scientificNameField.value.trim() || undefined,
            category: categoryField.value
        };

        updateBugs(oldBugs => [...oldBugs, newBug]);

        setBugCount(oldCount => oldCount + 1);

        nameField.resetValue();
        scientificNameField.resetValue();
        categoryField.resetValue();
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
                value={nameField.value}
                onChange={e => nameField.setValue(e.target.value)}
            />

            <input
                type="text"
                name="bug-scientific-name"
                placeholder="Scientific name (optional)..."
                value={scientificNameField.value}
                onChange={e => scientificNameField.setValue(e.target.value)}
            />

            <select
                name="bug-category"
                value={categoryField.value}
                onChange={e => categoryField.setValue(e.target.value)}
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