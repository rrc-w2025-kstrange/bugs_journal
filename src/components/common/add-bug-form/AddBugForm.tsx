import { useState } from "react";
import { bugCategories } from "../../../data/bugCategories";
import type { NewBugDetails } from "../../../services/bugService";

/**
 * Receives the current bug list and its setter as props.
 */
export function AddBugForm({
        onAddBug
    }: {
        onAddBug: (details: NewBugDetails) => string | undefined
    }) {
    const [nameValue, setNameValue] = useState<string>("");
    const [scientificNameValue, setScientificNameValue] = useState<string>("");
    const [categoryValue, setCategoryValue] = useState<string>(bugCategories[0]);

    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        setErrorMessage("");

        const error = onAddBug({
            name: nameValue,
            scientificName: scientificNameValue,
            category: categoryValue
        });

        if (error) {
            setErrorMessage(error);
            return;
        }

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