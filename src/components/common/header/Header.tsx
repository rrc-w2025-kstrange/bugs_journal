import logo from "../../../assets/kymiza_logo.jpg";
import "./Header.css";

export function Header() {
    return (
        <header className="site-header">
            <img src={logo} alt="Bugs Journal logo" className="site-header__logo" />
        </header>
    );
}

export default Header;