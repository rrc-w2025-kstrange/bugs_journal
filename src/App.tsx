import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/layout/Layout";
import { Bugs } from "./components/bugs/Bugs";
import  Collection  from "./components/collection/collection";

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
        
                <Route index element={<Bugs />} />
                <Route path="bugs" element={<Bugs />} />
                <Route path="collection" element={<Collection collectedSpecimens={collectedSpecimens} setCollectedSpecimens={setCollectedSpecimens} />} />
                {/* <Route path="collection" element={<Collection />} />
                    <Route path="identification" element={<Identification />} /> */}
            </Route>
        </Routes>
    );
}

export default App;