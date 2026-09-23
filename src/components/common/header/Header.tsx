import logo from "../../../assets/kymiza_logo.jpg";
import "./Header.css";

// Returns a single <section> element, per component requirements.
export function Header() {
    return (
        <section className="header">
            <img src={logo} alt="Bugs Journal logo" className="header_logo" />
            <div className="header_text">
                <h1>Bugs Journal</h1>
                <span>Find cool exotic bugs, one sighting at a time!🪲</span>
            </div>
        </section>
    );
}

export default Header;