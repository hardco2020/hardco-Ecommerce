export interface loginForm{
    email:string;
    password:string;
}

export interface Filters{
    color?: string;
    size?: string;
}

export type ProductListResponse = {
    message: string,
    data: Array<Product>
}
export type ProductResponse = {
    message: string,
    data: Product
}
export interface Product {
    _id: string;
    title: string;
    desc: string;
    img: string;
    categories?: string[];
    size?: string[];
    color?: string[];
    price: number;
    createdAt: any;
    updatedAt: any;
}

export interface CategoryInterface{
    id:number;
    img:string;
    title:string;
    cat:string;
}
export interface ProductItemInterface{
    id:number;
    img:string;
}