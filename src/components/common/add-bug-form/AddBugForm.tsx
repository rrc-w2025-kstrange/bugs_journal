import { useState } from "react";
import type { Bug } from "../../../types/bug";
import { bugCategories } from "../../../data/bugCategories";
import { useFieldValue } from "../../../hooks/useFieldValue";
import { bugService } from "../../../services/bugService";
import { useBugCount } from "../../../hooks/useBugCount";

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
    const { incrementBugCount } = useBugCount();
    const nameField = useFieldValue("");
    const scientificNameField = useFieldValue("");
    const categoryField = useFieldValue(bugCategories[0]);

    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        setErrorMessage("");

        const nameError = bugService.validateBugName(nameField.value);
        if (nameError) {
            setErrorMessage(nameError);
            return;
        }

        if (!bugService.isValidCategory(categoryField.value, bugCategories)) {
            setErrorMessage("Please select an existing category.");
            return;
        }

        const newId = bugService.getNextBugId(bugs);
        
        const newBug = bugService.buildNewBug (
            newId,
            nameField.value,
            scientificNameField.value,
            categoryField.value
        );
    

        updateBugs(oldBugs => [...oldBugs, newBug]);

        incrementBugCount();

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