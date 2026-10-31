import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/layout/Layout";
import Landing from "./components/pages/Landing";
import { Bugs } from "./components/pages/Bugs";
import Collection from "./components/pages/Collection";
import Identification from "./components/pages/Identification";

 
export function App() {
    const [bugCount, setBugCount] = useState(0);
 
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Landing />} />
                <Route path="bugs" element={
                    <Bugs bugCount={bugCount} setBugCount={setBugCount} />
                } />
                <Route path="collection" element={
                    <Collection
                        bugCount={bugCount}
                        setBugCount={setBugCount}
                    />
                } />
                <Route
                    path="identification"
                    element={
                        <Identification
                            bugCount={bugCount}
                            setBugCount={setBugCount}
                        />
                    }
                />
            </Route>
        </Routes>
    );
}
 
export default App;