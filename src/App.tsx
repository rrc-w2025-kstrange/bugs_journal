import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import type { Bug } from "./types/bug";
import { bugData } from "./data/bugData";
import { Layout } from "./components/common/layout/Layout";
import Landing from "./components/pages/Landing";
import { Bugs } from "./components/pages/Bugs";
import Collection from "./components/pages/Collection";
import Identification from "./components/pages/Identification";

interface CollectedBug {
  id: number;
  userId: number;
  commonName: string;
  scientificName: string;
  order: string;
  habitat: string;
  dateCollected: string;
}
 
export function App() {
    const [bugs, updateBugs] = useState<Bug[]>(bugData);
    const [bugCount, setBugCount] = useState(0);
    const [collectedSpecimens, setCollectedSpecimens] = useState<CollectedBug[]>([
        {
            id: 1,
            userId: 1,
            commonName: "Placeholder Beetle",
            scientificName: "Species placeholder",
            order: "Coleoptera",
            habitat: "Garden",
            dateCollected: "2026-09-01",
        },
    ]);
 
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Landing />} />
                <Route path="bugs" element={
                    <Bugs bugs={bugs} updateBugs={updateBugs} bugCount={bugCount} setBugCount={setBugCount} />
                } />
                <Route path="collection" element={
                    <Collection
                        collectedSpecimens={collectedSpecimens}
                        setCollectedSpecimens={setCollectedSpecimens}
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