import { createSlice,PayloadAction } from '@reduxjs/toolkit'

export interface CartState {
    products: CartActionInterface [];
    quantity: number; //這個為產品的數量
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
export interface CartActionInterface {
    product: CartSingleProdudctInterface;
    //---------------此處以上合併才能做比較
    quantity:number; //此為單個商品累積的數量
     
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
        initProduct:(state,action: PayloadAction<CartState>)=>{
            console.log(action.payload.products)
            state.products = action.payload.products
            state.quantity = action.payload.quantity
            state.total = action.payload.total
        },
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
        },
        deleteProduct:(state,action: PayloadAction<CartActionInterface>)=>{
            console.log(action.payload)
            console.log("123456")
            state.products = state.products.filter((item)=>item.product._id!==action.payload.product._id || (item.product.size !== action.payload.product.size || item.product.color !== action.payload.product.color))
            //留著的條件為product id  不一樣 或者 id一樣但 顏色和size其中一個不一樣就為不同產品
            state.quantity-=1;
            state.total-= action.payload.product.price * action.payload.quantity;
        },
        addProductQuantity:(state,action: PayloadAction<CartActionInterface>)=>{
            state.products.map((item)=>{
                if(item.product._id === action.payload.product._id && item.product.size === action.payload.product.size && item.product.color === action.payload.product.color){
                    item.quantity+=1
                    return item
                }
                return item
            })
            state.total+= action.payload.product.price;
        },
        subProductQuantity:(state,action: PayloadAction<CartActionInterface>)=>{
            if (action.payload.quantity >1){ //數量要大於1才做執行
                state.products.map((item)=>{
                    if(item.product._id === action.payload.product._id && item.product.size === action.payload.product.size && item.product.color === action.payload.product.color){
                        item.quantity-=1
                        return item
                    }
                    return item
                })
                state.total-= action.payload.product.price;
            }
        }

    }
})

export const  { initProduct, addProduct,deleteProduct,addProductQuantity, subProductQuantity} = cartSlice.actions

export default cartSlice.reducer;