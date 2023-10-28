import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payloadCreator } from "src/utils/utils";

import productApi from "src/api/product/product.api";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  payloadCreator(productApi.getProducts)
);

export const getDetailProduct = createAsyncThunk(
  "product/getDetailProduct",
  payloadCreator(productApi.getDetailProduct)
);
export const addProduct = createAsyncThunk(
  "product/addProduct",
  payloadCreator(productApi.addProduct)
);
export const uploadImageProduct = createAsyncThunk(
  "product/uploadImageProduct",
  payloadCreator(productApi.uploadImageProduct)
);
export const uploadImagesProduct = createAsyncThunk(
  "product/uploadImagesProduct",
  payloadCreator(productApi.uploadImagesProduct)
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  payloadCreator(productApi.updateProduct)
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  payloadCreator(productApi.deleteProduct)
);

interface IProudct {
  product: any;
  productDetail: any;
}

const initialState: IProudct = {
  product: [],
  productDetail: {},
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProduct.fulfilled, (state, { payload }) => {
      state.product = payload.data;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.product = payload.data.data;
    });
    // builder.addCase(getDetailProduct.fulfilled, (state, { payload }) => {
    //   state.productDetail = payload.data;
    // });
    // builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
    //   [state.productDetail, ...payload.data];
    // });
    // builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
    //   state.product = payload.data;
    // });
  },
});

const productReducer = productSlice.reducer;
export default productReducer;
