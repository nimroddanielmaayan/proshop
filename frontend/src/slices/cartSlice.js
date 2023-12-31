import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

// If there's a cart in local storage, then parse it from string to JSON and store it in a variable, otherwise set it to an empty array and store it in a variable
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // Check if the item is already in the cart
      const existItem = state.cartItems.find((x) => x._id === item._id);

      // If the item is already in the cart, then update the quantity
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // If the item is not in the cart, then add it to the cart
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state, item);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    // Set the shipping address
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

// We need to export the cart actions
export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

// In addition, we need to export the cartSlice reducer
export default cartSlice.reducer;

/* cartSlice.js - General Notes: */

// Note: The API slices don't use createSlice but rather createApi, because they are API slices, not "regular" slices

// We'll use local storage in this slice, just to store the cart items, shipping address, and payment method, so that when the user refreshes the page the cart items, shipping address, and payment method will still be there. There's no need to store all this information in the database, unless we want to use it for other purposes there (like for user analytics, for example)

// Local storage can only hold strings, so we'll use JSON.parse and JSON.stringify to convert the cart items, shipping address, and payment method to strings and back to objects

// Reminder: A reducer is a function that "lives" inside a slice, recieves the state and an action as parameters, and returns a new state

// Reminder: When defining a reducer, it's ok to "mutate" the state, because Redux Toolkit uses the immer library behind the scenes to handle the issue of state immutability for us
