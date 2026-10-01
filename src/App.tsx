import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import type { Bug } from "./types/bug";
import { bugData } from "./data/bugData";
import { Layout } from "./components/common/layout/Layout";
import Landing from "./components/pages/Landing";
import { Bugs } from "./components/pages/Bugs";

export function App() {
    // Shared state, stored here so every page can read and update the same bugs.
    // The list persists as the user moves between pages.
    const [bugs, updateBugs] = useState<Bug[]>(bugData);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Landing />} />
                <Route path="bugs" element={
                    <Bugs bugs={bugs} updateBugs={updateBugs} />
                } />
            </Route>
        </Routes>
    );
}

export default App;