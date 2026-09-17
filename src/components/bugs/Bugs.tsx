import bugData from "../../data/bugs.json";
import "./Bugs.css";

export interface Bug {
    id: number;
    name: string;
    scientificName?: string;
}

export interface Category {
    id: number;
    name: string;
    bugs: Bug[];
}

const categories: Category[] = bugData as Category[];

export function Bugs() {
    return (
        <section className="bugs">
            <Search />
            <CategoryList categories={categories} />
        </section>
    );
}

function CategoryList({ categories }: { categories: Category[] }) {
    const categorySections: JSX.Element[] = [];

    categories.forEach((category) => {
        categorySections.push(
            <CategorySection category={category} key={category.id} />
        );
    });

    return <>{categorySections}</>;
}

function CategorySection({ category }: { category: Category }) {
    const bugItems: JSX.Element[] = [];

    category.bugs.forEach((bug) => {
        bugItems.push(<BugItem bug={bug} key={bug.id} />);
    });

    return (
        <section className="category">
            <h3>{category.name}</h3>
            <ul className="category_list">{bugItems}</ul>
        </section>
    );
}

function BugItem({ bug }: { bug: Bug }) {
    return (
        <li>
            <span className="bug_name">{bug.name}</span>
            {bug.scientificName && (
                <em className="bug_sci"> ({bug.scientificName})</em>
            )}
        </li>
    );
}

function Search() {
    return (
        <section className="search">
            <h2>What bug are you looking for?</h2>
            <form action="#">
                <input type="text" name="field-bug" placeholder="Enter a bug name..." />
                <input type="submit" value="Search" />
            </form>
        </section>
    );
}

export default Bugs;