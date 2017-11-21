
export interface IProduct {
    
        Name: string;
        Category: string;
        Price: number;
    
        //getProducts(): string;
    }

export class Product implements IProduct {
    Id: number;
    Name: string;
    Category: string;
    Price: number;
}

export class File1 {
    name: string;
    size: string;
    type: string;
    children :File1[]
    
}