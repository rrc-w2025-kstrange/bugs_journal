import "./Footer.css";

export function Footer() {
    const year: number = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <small>Copyright KyMiZa {year}</small>
        </footer>
    );
}

export default Footer;