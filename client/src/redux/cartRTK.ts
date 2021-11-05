import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ProductInterface } from '../type/type'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  reducerPath: 'ProductApi',
  endpoints: (build) => ({
    getPokemonByName: build.query<ProductInterface, string>({
      query: (name) => `product/${name}`,
    }),
  }),
})

export const { useGetPokemonByNameQuery } = api