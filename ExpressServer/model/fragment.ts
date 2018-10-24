export interface FragmentOptions {
    first?: number;
    last?: number;
    sortField?: string;
    sortDirection?: "asc" | "desc"
}

export interface Fragment<T> {
    items: T[];
    total: number;
    first: number;
    last: number;
}