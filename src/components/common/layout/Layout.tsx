import { Outlet } from "react-router-dom";
import { Header } from "../header/Header";
import { Nav } from "./nav/Nav";
import { Footer } from "./footer/Footer";

/**
 * Shared page structure: the site header, the nav, whichever page
 * is currently active (the Outlet), and the footer.
 */

export function Layout() {
    return (
        <>
            <Header />
            <Nav />
            <Outlet />
            <Footer />
        </>
    );
}