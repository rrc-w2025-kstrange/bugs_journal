import type { Bug, CreateBugInput } from "../types/bug";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/bugs`;

export const bugRepository = {
  getAll: async (): Promise<Bug[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch bugs');
    return response.json();
  },

  create: async (data: CreateBugInput): Promise<Bug> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create bug');
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete bug');
  }
};