export interface CollectedBug {
    id: number;
    userId: number;
    commonName: string;
    scientificName: string;
    order: string;
    habitat: string;
    dateCollected: string;
}

export type NewCollectedBug = Omit<CollectedBug, 'id'>;