import { Product } from "../../products/entities/product.entity";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    products: Product[];
}
