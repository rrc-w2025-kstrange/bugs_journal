import type { Bug } from "../../types/bug";

/**
 * Renders one single bug, with a button to remove it.
 * This receives its data and its click handler as props.
 */
export function BugItem({
        bug,
        onRemoveClick
    }: {
        bug: Bug,
        onRemoveClick: () => void
    }) {
    return (
        <li className="bug-item">
            <span className="bug-name">{bug.name}</span>
            {bug.scientificName && (
                <em className="bug-sci"> ({bug.scientificName})</em>
            )}
            <button onClick={onRemoveClick}>Remove</button>
        </li>
    );
}