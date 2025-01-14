import { createSlice } from "@reduxjs/toolkit";

// Function to load cart data from localStorage (on initial load)
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cartData");
  // If cartData exists in localStorage, parse it and return; else return an empty cart
  return cartData ? JSON.parse(cartData) : { cartProducts: [] };
};

// Function to save cart data to localStorage (called when cart changes)
const saveCartToLocalStorage = (cartProducts) => {
  const cartData = { cartProducts }; // Cart data object structure
  // Save cart data to localStorage, converting the object to a string
  localStorage.setItem("cartData", JSON.stringify(cartData));
};

// Initial state is loaded from localStorage
const initialState = loadCartFromLocalStorage();

// Redux slice for managing the cart
export const cartSlice = createSlice({
  name: "cart", // Slice name
  initialState, // Initial state loaded from localStorage
  reducers: {
    // Function to add a product to the cart
    addProduct: (state, action) => {
      // Check if the product already exists in the cart
      const product = state.cartProducts.find(
        (product) => product.id === action.payload.id
      );
      
      if (product) {
        // If the product exists, increase its quantity
        product.quantity += 1;
      } else {
        // If product does not exist, add it to the cart
        state.cartProducts.push(action.payload);
      }
      // Save updated cart to localStorage
      saveCartToLocalStorage(state.cartProducts);
    },

    // Function to increment the quantity of a product
    increment: (state, action) => {
      const product = state.cartProducts.find(
        (product) => product.id === action.payload
      );
      
      if (product) {
        // Increase quantity by 1
        product.quantity += 1;
      }
      // Save updated cart to localStorage
      saveCartToLocalStorage(state.cartProducts);
    },

    // Function to decrement the quantity of a product
    decrement: (state, action) => {
      const product = state.cartProducts.find(
        (product) => product.id === action.payload
      );
      
      if (product && product.quantity > 1) {
        // Decrease quantity by 1 (but ensure it doesn't go below 1)
        product.quantity -= 1;
      }
      // Save updated cart to localStorage
      saveCartToLocalStorage(state.cartProducts);
    },

    // Function to remove a product from the cart
    removeProduct: (state, action) => {
      const productIndex = state.cartProducts.findIndex(
        (product) => product.id === action.payload
      );
      
      if (productIndex !== -1) {
        // If product is found, remove it from the cart array
        state.cartProducts.splice(productIndex, 1);
      }
      // Save updated cart to localStorage
      saveCartToLocalStorage(state.cartProducts);
    },

    // Function to clear all products from the cart
    clearCartProducts: (state) => {
      state.cartProducts = []; // Empty the cart array
      state.finalAmount = 0; // Reset finalAmount (if used)
      // No need to save to localStorage here since the cart is being cleared
    },
  },
});

// Export actions to be used in components
export const {
  addProduct,
  increment,
  decrement,
  removeProduct,
  clearCartProducts,
} = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
