import { Book } from "./book";

export interface Author {
    wweId: number,
    name: string,
    year?: number;
    bookCount?: number,
    books?: Book[]
}

export type Authors = Author[];



