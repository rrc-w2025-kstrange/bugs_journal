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
    },
};