export type Bug = {
    id: number,
    name: string,
    scientificName?: string,
    category: string
}

export type CreateBugInput = {
    name: string,
    scientificName?: string,
    category: string
}