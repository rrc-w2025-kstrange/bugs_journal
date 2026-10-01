import logo from "../../assets/kymiza_logo.jpg";

export function Landing() {
    return (
        <>
            <header>
                <img src={logo} alt="Bugs Journal logo" className="logo" />
                <h1>Bugs Journal</h1>
                <span>Find cool exotic bugs, one sighting at a time!🪲</span>
            </header>
            <main>
                <section>
                    <p>
                        A bugs journal where users can explore different bugs and
                        keep track of what they find.
                    </p>
                </section>
            </main>
        </>
    );
}

export default Landing;