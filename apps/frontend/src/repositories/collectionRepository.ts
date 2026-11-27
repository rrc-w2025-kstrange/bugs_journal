import type { CollectedBug, NewCollectedBug } from "../types/collectedBug";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/collected-bugs`;

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
  }
};