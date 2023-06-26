import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;

// This file uses RTK Query behind the scenes for making API requests, instead of the fetch API or Axios. RTK Query is the recommended way to make API requests with Redux Toolkit and it has a lot of tools and benefits

// More info here: https://redux-toolkit.js.org/rtk-query/api/created-api/overview#endpoints

// The convention in naming exported API slices like this one is: useGet<data>Query. In this case, <data> = Products

// Note, that the "parent" slice (apiSlice) was defined with an empty endpoints object, and this slice "injects" its endpoints into the parent slice, using the injectEndpoints() method
