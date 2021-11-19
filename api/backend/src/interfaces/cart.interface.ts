export interface Cart {
  products: CartProduct[];
  quantity: number;
  total: number;
}
export interface CartProduct {
  product: CartSingleProduct[];
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
