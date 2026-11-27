export interface CollectedBug {
    id: number;
    userId: number;
    bugId: number;
    name: string;
    scientificName: string | null;
    category: string;
    dateCollected: string;
}

export type NewCollectedBug = Pick<CollectedBug, 'userId' | 'bugId'>;