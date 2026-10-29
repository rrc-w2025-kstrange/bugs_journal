import { bugCategories } from "../../../data/bugCategories";
import { useFieldValue } from "../../../hooks/useFieldValue";
import type { CreateBugInput } from "../../../types/bug";

/**
 * Form to add a bug.
 * It only collects what the user types (using the useFieldValue hook) and sends
 * it to the onAdd method it receives. The rules and the saving are handled by
 * the useBugs hook, bugService and bugRepository, so this form has no business
 * logic or data access in it.
 */
export function AddBugForm({
        onAdd
    }: {
        onAdd: (input: CreateBugInput) => Promise<boolean>
    }) {
    const nameField = useFieldValue("");
    const scientificNameField = useFieldValue("");
    const categoryField = useFieldValue(bugCategories[0]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const added = await onAdd({
            name: nameField.value,
            scientificName: scientificNameField.value,
            category: categoryField.value
        });

        if (added) {
            nameField.resetValue();
            scientificNameField.resetValue();
            categoryField.resetValue();
        }
    };

    return (
        <form className="add-bug-form" onSubmit={handleSubmit}>
            <h2>Add a Bug</h2>

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