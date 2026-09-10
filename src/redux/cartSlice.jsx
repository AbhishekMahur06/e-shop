import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cart");

const initialState = savedCart ? JSON.parse(savedCart) : [];

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    deleteFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },

    increaseQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.find((item) => item.id === action.payload.id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: () => {
      return [];
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
