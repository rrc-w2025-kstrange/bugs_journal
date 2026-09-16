// Sample Data
type Bug = {
    id: number,
    name: string,
    scientificName?: string
};

const testBugs: Bug[] = [
    {id: 0, name: "Goliath Beetle", scientificName: "Goliathus goliatus"},
    {id: 1, name: "Atlas Moth", scientificName: "Attacus atlas"},
    {id: 2, name: "Orchid Mantis", scientificName: "Hymenopus coronatus"},
    {id: 3, name: "Leaf Insect", scientificName: "Phyllium giganteum"},
    {id: 4, name: "Jewel Beetle"}
];


export function Bugs() {

    return (
        <>
            <header>
                <h1>Bugs Journal</h1>
                <span>Find cool exotic bugs, one sighting at a time!</span>
            </header>
            <main>
                <Search />
                <ListDisplay bugs={testBugs}/>
            </main>
        </>
    );
}


function Search() {

    return(
        <section className="search">
            <h2>What bug are you looking for?</h2>
            <form action="#">
                <input type="text" name="field-bug" placeholder="Enter a bug name..." />
                <input type="submit" value="Search" />
            </form>
        </section>
    );
}

function ListDisplay({bugs}: {bugs: Bug[]}) {
    const bugListItems: JSX.Element[] = [];

    bugs.forEach((bug) => {
        bugListItems.push(<ListBugItem
                name={bug.name}
                key={bug.id}
            />
        );
    })

    return(
        <section className="top-bugs">
            <h2>Today's Bugs:</h2>
            <ol className="top-bugs__list">
                {bugListItems}
            </ol>
        </section>
    )
}

function ListBugItem({name}: {name: string}) {
    return (
        <li>
            <a href="#">{name}</a>
        </li>
    )
}


export default Bugs;