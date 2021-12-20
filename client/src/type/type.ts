import { CartState } from "../redux/cartRedux"

export interface UserResponse {
    data: UserResponseData;
    message: string;
}
export interface UserResponseData{
    findUser:UserDataInterface;
    cookie:string;
}
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
    data: ProductInterface[]
    totalPage: number;
}
export type ProductResponse = {
    message: string,
    data: ProductInterface
}
export interface ProductInterface {
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
    inStock:boolean;
}
export type AddProductInterface = {
    title: string;
    desc: string;
    img?: string;
    categories: string[];
    size: string[];
    color?: string[];
    price: number;
    inStock:boolean;
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
export interface UserDataInterface{
    _id:string;
    email:string;
    createdAt:Date;
    updatedAt:Date;
    username:string;
    img:string;
}
export interface UserDataResponseInterface{
    message: string,
    data: UserDataInterface[]
}
export interface CartPostInterface{
    id:string;
    cart:CartState;
}

export interface OrderResponseInterface{
    message:string,
    data: OrderDataInterface[]
}

export interface OrderDataInterface{
  _id:string;
  userId: string;
  products: CartProduct[];
  total: number;
  address: Object;
  status: string;
  createdAt: any;
  updatedAt: any;
}
export interface CartProduct {
    product: CartSingleProduct;
    quantity: number;
}
  
export interface CartSingleProduct {
_id: string;
title: string;
desc: string;
img: string;
categories?: string[];
price: number;
createdAt: any;
updatedAt: any;
//---------------
size: string;
color: string;
}


export interface UserStateResponseInterface {
    data:UserStateInterface[];
    message:string;
}
export interface UserStateInterface {
    _id:string;
    total:number;
}

export interface SalesIncomeResponseInterface {
    data:SalesIncomeInterface[];
    message:string;
}
export interface SalesIncomeInterface{
    _id:string;
    total:number;
}

export interface ProductUpdateRequestInterface{
    productId:string;
    productData:Partial<ProductInterface>
}

export type StripeToken = {
    tokenId:any;
    userId:string;
    cart : CartState;
    amount: number;
}


export type PopoverCategory = {
    Title:string;
    Category: Category[];
}

export type Category = {
    name:string;
}

export type Email = {
    message:string;
}