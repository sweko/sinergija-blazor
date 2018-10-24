export interface Book { 
    id: number;
    title: string;
    author?: {
        id: number;
        name: string;
    };
}