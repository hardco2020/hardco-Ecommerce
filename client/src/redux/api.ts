import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartPostInterface, loginForm, UserResponse } from "../type/type";
import { CartState } from "./cartRedux";
import { RootState } from "./store";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token:string = (getState() as RootState).auth.token!;
      if(token!==null){
        headers.set("Authorization", `Bearer ${token}`);
        // }
      }
      return headers;
    }
  }),
  endpoints: (build) => ({
    login: build.mutation<UserResponse, loginForm>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials
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
        return response.data
      },
    }),
    putCartByID: build.mutation<CartState,CartPostInterface>({
      query: (credentials) => ({
        url: `cart/${credentials.id}`,
        method: "PUT",
        body: {userId: credentials.id ,...credentials.cart}
      })
    })

  })
});

export const { useLoginMutation,usePutCartByIDMutation,useGetCartByIDQuery } = api;