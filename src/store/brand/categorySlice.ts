import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "src/api/category/category.api";
import { payloadCreator } from "src/utils/utils";

export const getCategorys = createAsyncThunk(
  "category/getCategorys",
  payloadCreator(categoryApi.getCategorys)
);

export const getDetailCategory = createAsyncThunk(
  "category/getDetailCategory",
  payloadCreator(categoryApi.getDetailCategory)
);
export const addCategory = createAsyncThunk(
  "category/addCategory",
  payloadCreator(categoryApi.addCategory)
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  payloadCreator(categoryApi.updateCategory)
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  payloadCreator(categoryApi.deleteCategory)
);

interface IProudct {
  category: any;
  categoryDetail: any;
}

const initialState: IProudct = {
  category: [],
  categoryDetail: {},
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCategory.fulfilled, (state, { payload }) => {
      state.category = payload.data;
    });
    builder.addCase(getCategorys.fulfilled, (state, { payload }) => {
      state.category = payload.data.data;
    });
    builder.addCase(getDetailCategory.fulfilled, (state, { payload }) => {
      state.categoryDetail = payload.data;
    });
    // builder.addCase(updatecategory.fulfilled, (state, { payload }) => {
    //   [state.categoryDetail, ...payload.data];
    // });
    // builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
    //   state.category = payload.data;
    // });
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
