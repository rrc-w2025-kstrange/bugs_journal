import { NavLink } from "react-router-dom";
import "./Nav.css";

/**
 * Navigation Interface
 * NavLink automatically adds a class to the active link
 */
export function Nav() {
    return (
        <nav>
            <NavLink to="/" end>
                Home
            </NavLink>
            <NavLink to="/bugs">
                Bugs
            </NavLink>
            <NavLink to="/collection">
                Collection
            </NavLink> 
            <NavLink to="/identification">
                Identification
            </NavLink>            
        </nav>
    );
}