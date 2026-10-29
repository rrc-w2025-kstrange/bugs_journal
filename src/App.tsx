import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import type { Bug } from "./types/bug";
import { bugData } from "./data/bugData";
import { collectionData } from "./data/collectionData";
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
    const [collectedSpecimens, setCollectedSpecimens] =
        useState<CollectedBug[]>(collectionData);
 
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Landing />} />
                <Route path="bugs" element={
                    <Bugs bugs={bugs} updateBugs={updateBugs} />
                } />
                <Route path="collection" element={
                    <Collection
                        collectedSpecimens={collectedSpecimens}
                        setCollectedSpecimens={setCollectedSpecimens}
                    />
                } />
                <Route
                    path="identification"
                    element={
                        <Identification />
                    }
                />
            </Route>
        </Routes>
    );
}
 
export default App;