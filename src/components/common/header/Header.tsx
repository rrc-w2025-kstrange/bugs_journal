import logo from "../../../assets/kymiza_logo.jpg";
import "./Header.css";

export function Header() {
    return (
        <header className="site-header">
            <img src={logo} alt="Bugs Journal logo" className="site-header__logo" />
            <div className="site-header__text">
                <h1>Bugs Journal</h1>
                <span>Find cool exotic bugs, one sighting at a time!</span>
            </div>
        </header>
    );
}

export default Header;