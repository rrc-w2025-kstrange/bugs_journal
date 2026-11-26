<<<<<<< HEAD
import { bugData } from "../data/bugData";
import type { Bug, CreateBugInput } from "../types/bug";

let bugs: Bug[] = bugData.map((bug) => ({ ...bug }));

let nextId = Math.max(...bugs.map((bug) => bug.id), 0) + 1;

export const bugRepository = {
    async getAll(): Promise<Bug[]> {
        return bugs.map((bug) => ({ ...bug }));
    },

    async getById(id: number): Promise<Bug | null> {
        const bug = bugs.find((bug) => bug.id === id);

        return bug ? { ...bug } : null;
    },

    async add(input: CreateBugInput): Promise<Bug> {
        const bug: Bug = {
            id: nextId++,
            ...input,
        };

        bugs = [...bugs, bug];

        return { ...bug };
    },

    async update(updatedBug: Bug): Promise<Bug | null> {
        const exists = bugs.some((bug) => bug.id === updatedBug.id);

        if (!exists) {
            return null;
        }

        bugs = bugs.map((bug) =>
            bug.id === updatedBug.id ? { ...updatedBug } : bug,
        );

        return { ...updatedBug };
    },

    async remove(id: number): Promise<boolean> {
        const originalLength = bugs.length;

        bugs = bugs.filter((bug) => bug.id !== id);

        return bugs.length < originalLength;
=======
import type { Bug, CreateBugInput } from "../types/bug";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const endpoint = `${baseUrl}/api/bugs`;

async function readJson<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return (await response.json()) as T;
}

export const bugRepository = {
    async getAll(): Promise<Bug[]> {
        const response = await fetch(endpoint);
        return readJson<Bug[]>(response);
    },

    async add(input: CreateBugInput): Promise<Bug> {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        });

        return readJson<Bug>(response);
    },

    async remove(id: number): Promise<boolean> {
        const response = await fetch(`${endpoint}/${id}`, {
            method: "DELETE",
        });

        if (response.status === 404) return false;

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        return true;
>>>>>>> develop
    },
};