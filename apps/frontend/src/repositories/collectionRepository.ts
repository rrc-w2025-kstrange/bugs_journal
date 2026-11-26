<<<<<<< HEAD
import type { CollectedBug, NewCollectedBug } from "../types/collectedBug";

const API_URL = 'http://localhost:5000/api/collected-bugs';

export const collectionRepository = {
  getCollectedBugs: async (): Promise<CollectedBug[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json(); 
  },
  
  addCollectedBug: async (newBug: NewCollectedBug): Promise<CollectedBug> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBug),
    });
    if (!response.ok) throw new Error('Failed to add');
    return response.json();
  },

  removeCollectedBug: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete');
=======
import type { CollectedBug } from "../types/collectedBug";
import { collectedBugData } from "../data/collectedBugData";

let collectedBugs: CollectedBug[] = collectedBugData.map((bug) => ({ ...bug }));

export const collectionRepository = {
  getCollectedBugs: (): CollectedBug[] => {
    return collectedBugs; 
  },
  addCollectedBug: (newBug: CollectedBug): CollectedBug[] => {
    // This updates the memory bank with the new bug
    collectedBugs = [...collectedBugs, newBug]; 
    return collectedBugs;
  },
  removeCollectedBug: (id: number): CollectedBug[] => {
    // This updates the memory bank by removing the bug
    collectedBugs = collectedBugs.filter((bug) => bug.id !== id);
    return collectedBugs;
>>>>>>> develop
  }
};