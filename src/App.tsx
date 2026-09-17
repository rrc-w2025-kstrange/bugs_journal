import { Header } from "./components/common/header/Header";
import { Bugs } from "./components/bugs/Bugs";
import { Footer } from "./components/common/footer/Footer";

export function App() {
    return (
        <>
            <Header />
            <main>
                <Bugs />
            </main>
            <Footer />
        </>
    );
}

export default App;