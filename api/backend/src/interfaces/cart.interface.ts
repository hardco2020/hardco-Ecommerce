export interface Cart {
  userId: string;
  products: CartProduct[];
}
export interface CartProduct {
  productId: string;
  quantity: number;
}
