import { createSlice } from "@reduxjs/toolkit";
export const orders = createSlice({
  name: "orders",
  initialState: {
    order: {
      data: [],
      // data: order,
    },
  },
  reducers: {
    getAllOrder: (state, action) => {
      state.order.data = action.payload;
    },
    // updateStatusOrder: (state,action) => {
    //     state.order.data = [...state.order.data,action.payload]

    // }
  },
});
export const { getAllOrder } = orders.actions;
const orderReducer = orders.reducer;
export default orderReducer;
