// Importing necessary functions from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Importing individual reducers for different parts of the state
import cartReducer from "./cart/cartSlice";          // Reducer to manage cart state

// Configuring and creating the Redux store
export const store = configureStore({
  reducer: {
    // The key names here represent the slices of the state, and the value is the reducer
    cart: cartReducer,           // Adds the cartReducer to manage cart-related state
  },
});
