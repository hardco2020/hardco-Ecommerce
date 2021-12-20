import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CartPostInterface,
  loginForm,
  OrderDataInterface,
  OrderResponseInterface,
  ProductInterface,
  ProductUpdateRequestInterface,
  UserDataResponseInterface,
  UserResponse,
  UserStateResponseInterface,
  StripeToken,
  UserDataInterface,
  SalesIncomeInterface,
  ProductListResponse,
  AddProductInterface,
  Email
} from "../type/type";
import { CartState } from "./cartRedux";
import { RootState } from "./store";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token: string = (getState() as RootState).auth.token!;
      if (token !== null) {
        headers.set("Authorization", `Bearer ${token}`);
        // }
      }
      return headers;
    },
  }),
  tagTypes: ['Products','Product','Orders','Users'],
  endpoints: (build) => ({
    login: build.mutation<UserResponse, loginForm>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      // transformResponse: (response: { data: UserResponse }) => {
      //   return response.data
      // },
    }),
    getCartByID: build.query<CartState, string>({
      query: (credentials) => ({
        url: `cart/${credentials}`,
        method: "GET",
      }),
      transformResponse: (response: { data: CartState }) => {
        return response.data;
      },
    }),
    putCartByID: build.mutation<CartState, CartPostInterface>({
      query: (credentials) => ({
        url: `cart/${credentials.id}`,
        method: "PUT",
        body: { userId: credentials.id, ...credentials.cart },
      }),
    }),
    getAllUser: build.query<UserDataInterface[],void>({
      query: ()=>({
        url: `users`,
        method: "GET",
      }),
      transformResponse: (response: { data: UserDataInterface[] }) => response.data,
      providesTags:['Users'],
    }),
    getNewUser: build.query<UserDataResponseInterface,void>({
      query: () => ({
        url: `users/?new=true`,
        method: "GET",
        // headers: { Authorization: args.blup }
      }),
    }),
    getNewOrder: build.query<OrderResponseInterface, void>({
      query: () => ({
        url: `order/?new=true`,
        method: "GET",
        // headers: { Authorization: args.blup }
      }),
    }),
    deleteUser: build.mutation<UserDataInterface,string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
        // headers: { Authorization: args.blup }
      }),
      transformResponse: (response: { data: UserDataInterface }) => response.data,
      invalidatesTags:['Users'],
    }),
    getOrderById: build.query<OrderDataInterface[],string>({
      query: (id) => ({
        url: `order/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: OrderDataInterface[] }) => response.data,
      providesTags:['Orders']
    }),
    getStats: build.query<UserStateResponseInterface, void>({
      query: () => ({
        url: `users/find/stats`,
        method: "GET",
      }),
    }),
    getIncome: build.query<SalesIncomeInterface[],void>({
      query: () => ({
        url: `order/get/income`,
        method: "GET",
      }),
      transformResponse: (response: { data: SalesIncomeInterface[] }) => response.data,
    }),
    getProducts: build.query<ProductListResponse,number>({
      query: (page) => ({
        url: `products/?page=${page}`,
        method: "GET",
      }),
      //transformResponse: (response: { data: ProductInterface[] }) => response.data,
      providesTags: (result) =>
          // is result available?
          result
            ? // successful query
              [
                ...result.data.map(({ _id }) => ({ type: 'Products', _id } as const)),
                { type: 'Products', id: 'LIST' },
              ]
            : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
              [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById:build.query<ProductInterface,string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { data: ProductInterface }) => response.data,
      providesTags: ['Product']
    }),

    updateProductById:build.mutation<ProductInterface,ProductUpdateRequestInterface>({
      query:(updateProduct)=>({
        url:`products/${updateProduct.productId}`,
        method:"PUT",
        body:updateProduct.productData
      }),
      invalidatesTags: ['Products','Product'],
    }),

    deleteProductById:build.mutation<ProductInterface,string>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: ProductInterface }) => response.data,
      invalidatesTags: ['Products']
    }),
    
    addProduct:build.mutation<ProductInterface,AddProductInterface>({
      query: (product) => ({
        url: `products`,
        method: "POST",
        body: product
      }),
      transformResponse: (response: { data: ProductInterface }) => response.data,
      invalidatesTags: ['Products']
    }),
    stripePayment:build.mutation<void,StripeToken>({
      query:(StripeToken)=>({
        url:`stripe/payment`,
        method:"POST",
        body:StripeToken,
      }),
      invalidatesTags:['Orders']
    }),
    searchProduct:build.mutation<ProductInterface[],string>({
      query:(searchName)=>({
        url:`products/search/${searchName}`,
        method:"GET"
      }),
      transformResponse: (response: { data: ProductInterface[] }) => response.data,
    }),
    sendEmail: build.mutation<void,Email>({
      query:(message)=>({
        url:`email/sendall`,
        method:"POST",
        body:message
      }),
    })
  }),
});

export const {
  useLoginMutation,
  usePutCartByIDMutation,
  useGetCartByIDQuery,
  useGetNewUserQuery,
  useGetNewOrderQuery,
  useGetStatsQuery,
  useGetIncomeQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductByIdMutation,
  useDeleteProductByIdMutation,
  useAddProductMutation,
  useGetOrderByIdQuery,
  useStripePaymentMutation,
  useSearchProductMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useSendEmailMutation,
} = api;
