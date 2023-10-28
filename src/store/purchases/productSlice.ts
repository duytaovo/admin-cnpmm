import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import purchasesApi from "src/api/purchase/purchases.api";
import { payloadCreator } from "src/utils/utils";

export const getPurchase = createAsyncThunk(
  "purchases/getPurchase",
  payloadCreator(purchasesApi.getPurchases)
);

export const getDetailPurchase = createAsyncThunk(
  "purchases/getDetailProduct",
  payloadCreator(purchasesApi.getPurchases)
);

export const updatePurchase = createAsyncThunk(
  "purchases/updatePurchase",
  payloadCreator(purchasesApi.updatePurchase)
);

export const deletePurchase = createAsyncThunk(
  "purchases/deletePurchase",
  payloadCreator(purchasesApi.deletePurchase)
);

interface IProudct {
  purchase: any;
  purchaseDetail: any;
}

const initialState: IProudct = {
  purchase: [],
  purchaseDetail: {},
};
const purchaseSlice = createSlice({
  name: "purchases",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(.fulfilled, (state, { payload }) => {
    //   state.purchase = payload.data;
    // });
    builder.addCase(getPurchase.fulfilled, (state, { payload }) => {
      state.purchase = payload.data.data;
    });
    // builder.addCase(getDetailpurchase.fulfilled, (state, { payload }) => {
    //   state.purchaseDetail = payload.data;
    // });
    // builder.addCase(updatepurchase.fulfilled, (state, { payload }) => {
    //   [state.purchaseDetail, ...payload.data];
    // });
    // builder.addCase(deletepurchase.fulfilled, (state, { payload }) => {
    //   state.purchase = payload.data;
    // });
  },
});

const purchaseReducer = purchaseSlice.reducer;
export default purchaseReducer;
