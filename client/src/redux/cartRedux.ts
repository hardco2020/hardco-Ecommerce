import { createSlice,PayloadAction } from '@reduxjs/toolkit'

interface CartState {
    products: CartActionInterface [];
    quantity: number;
    total: number;
}
export interface CartSingleProdudctInterface{
    _id: string;
    title: string;
    desc: string;
    img: string;
    categories?: string[];
    price: number;
    createdAt: any;
    updatedAt: any;
    //---------------
    size:string;
    color:string;
}
interface CartActionInterface {
    product: CartSingleProdudctInterface;
    //---------------此處以上合併才能做比較
    quantity:number;
    
}
const initialState: CartState = {
    products :[], //singleProduct + quantity 為 裡面的內容
    quantity:0,
    total: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        addProduct:(state,action: PayloadAction<CartActionInterface>)=>{
            // if action.payload.product  == state裡有的product內容
            //需要將products內每個product除了quantity以為的內容隔離出來並做比較
            if(state.products.some((item)=>{
                if(item.product._id === action.payload.product._id && item.product.size === action.payload.product.size && item.product.color === action.payload.product.color){
                    return item
                } //同類型產品之後接下來則是 同顏色同size與否
            })){
                state.products.map((item)=>{
                    if(item.product._id === action.payload.product._id && item.product.size === action.payload.product.size && item.product.color === action.payload.product.color){
                        item.quantity+=action.payload.quantity
                        return item
                    }
                    else{
                        return item
                    }
                })
            }else{ //如果map到就
                state.quantity+=1;
                state.products.push(action.payload);
            }
            state.total += action.payload.product.price * action.payload.quantity;
        }
        
    }
})

export const  { addProduct } = cartSlice.actions

export default cartSlice.reducer;