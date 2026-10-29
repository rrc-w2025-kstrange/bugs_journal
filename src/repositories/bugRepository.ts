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
    },
};