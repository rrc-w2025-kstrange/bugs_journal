import type { Bug } from "../../types/bug";
import { bugCategories } from "../../data/bugCategories";
import { BugItem } from "./BugItem";

/**
 * Component to add or remove a bug as an admin.
 * Receives the full bug list and groups it by the hardcoded categories
 * Removing a bug updates state immediately.
 */
export function BugList({
        bugs,
        updateBugs
    }: {
        bugs: Bug[],
        updateBugs: React.Dispatch<React.SetStateAction<Bug[]>>
    }) {
    const handleRemoveClick = (bugToRemove: Bug): void => {
        // Keep every bug except the one that was clicked
        updateBugs(oldBugs => oldBugs.filter(b => b.id !== bugToRemove.id));
    };

    return (
        <div className="bug-list">
            {bugCategories.map(category => {
                // Only the bugs that belong to this category
                const bugsInCategory = bugs.filter(b => b.category === category);

                return (
                    <section className="category" key={category}>
                        <h3>{category}</h3>
                        <ul className="category-list">
                            {bugsInCategory.map(bug => (
                                <BugItem
                                    bug={bug}
                                    onRemoveClick={() => handleRemoveClick(bug)}
                                    key={bug.id}
                                />
                            ))}
                        </ul>
                    </section>
                );
            })}
        </div>
    );
}