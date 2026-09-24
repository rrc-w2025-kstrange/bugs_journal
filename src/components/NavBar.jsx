import { NavLink} from "react-router-dom";
import "./NavBar.css";

function NavBar() {
    return (
        <nav className="navbar">
            <NavLink
                to="/bugs"
                className={({ isActive }) => isActive ? "active" : ""}
            >
                Bugs
            </NavLink>

            <NavLink
                to="/collection"
                className={({ isActive }) => isActive ? "active" : ""}
            >
                Bug Collection
            </NavLink>
            
            <NavLink
                to="/identification"
                className={({ isActive }) => isActive ? "active" : ""}
            >
                Bug Identification
            </NavLink>
        </nav>
    )
}

export default NavBar;