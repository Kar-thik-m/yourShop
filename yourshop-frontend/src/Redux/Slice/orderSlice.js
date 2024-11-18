import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};


const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders.push(action.payload);  
    },
    createOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    getOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderStatusRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateOrderStatusSuccess: (state, action) => {
      state.loading = false;
      state.orders = state.orders.map(order =>
        order._id === action.payload._id ? action.payload : order
      );
    },
    updateOrderStatusFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders = state.orders.filter(order => order._id !== action.payload);
    },
    deleteOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions from the slice
export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  getOrdersRequest,
  getOrdersSuccess,
  getOrdersFailure,
  updateOrderStatusRequest,
  updateOrderStatusSuccess,
  updateOrderStatusFailure,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
