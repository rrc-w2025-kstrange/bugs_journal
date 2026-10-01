import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/layout/Layout";
import { Bugs } from "./components/pages/Bugs";
import { Landing } from "./components/pages/Landing";


export function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
        
                <Route index element={<Landing />} />
                <Route path="bugs" element={<Bugs />} />
                {/* <Route path="collection" element={<Collection />} />
                    <Route path="identification" element={<Identification />} /> */}
            </Route>
        </Routes>
    );
}

export default App;