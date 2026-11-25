import type { Bug } from "../../../types/bug";
import { bugCategories } from "../../../data/bugCategories";
import { BugItem } from "../bug-item/BugItem";

/**
 * Shows the bugs grouped by the hardcoded categories.
 * It only displays the list it is given and tells the page which bug was
 * clicked through onRemove. The removing itself is done by the useBugs hook,
 * bugService and bugRepository.
 */
export function BugList({
        bugs,
        onRemove
    }: {
        bugs: Bug[],
        onRemove: (id: number) => void
    }) {
    const handleRemoveClick = (bugToRemove: Bug): void => {
        onRemove(bugToRemove.id);
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