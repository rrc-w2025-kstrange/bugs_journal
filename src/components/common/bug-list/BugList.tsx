import type { Bug } from "../../../types/bug";
import { bugCategories } from "../../../data/bugCategories";
import { BugItem } from "../bug-item/BugItem";

/**
 * Component to add or remove a bug as an admin.
 * Receives the full bug list and groups it by the hardcoded categories
 * Removing a bug updates state immediately.
 */
export function BugList({
        bugs,
        updateBugs,
        setBugCount
    }: {
        bugs: Bug[],
        updateBugs: React.Dispatch<React.SetStateAction<Bug[]>>,
        setBugCount: React.Dispatch<React.SetStateAction<number>>
    }) {
    const handleRemoveClick = (bugToRemove: Bug): void => {
        // Keep every bug except the one that was clicked
        updateBugs(oldBugs => oldBugs.filter(b => b.id !== bugToRemove.id));
        setBugCount(oldCount => Math.max(0, oldCount - 1));
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