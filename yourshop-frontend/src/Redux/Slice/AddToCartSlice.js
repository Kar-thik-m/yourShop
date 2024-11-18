import { createSlice } from "@reduxjs/toolkit";

const AddToCartSlice = createSlice({
  name: "addtocart",
  initialState: {
    loading: false,
    Cart: [],
    error: null,
  },
  reducers: {
    addToPostRequest(state) {
      state.loading = true;
      state.error = null;
    },

    addTopostSuccess(state, action) {
      state.loading = false;
      state.Cart = [...state.Cart, action.payload];
    },

    addToFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getCartSuccess(state, action) {
      state.loading = false;
      state.Cart = action.payload;
    },

    getCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    removeItemFromCart(state, action) {
      state.loading = false;
      state.Cart = state.Cart.filter(item => item.productId !== action.payload);
    },

    removeItemFromCartFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addToFailure,
  addToPostRequest,
  addTopostSuccess,
  getCartSuccess,
  getCartFailure,
  removeItemFromCart,
  removeItemFromCartFailure,
} = AddToCartSlice.actions;

export default AddToCartSlice.reducer;
