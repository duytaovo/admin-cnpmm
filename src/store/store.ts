import {
  AnyAction,
  Store,
  ThunkDispatch,
  configureStore,
} from "@reduxjs/toolkit";
import appReducer from "src/app.slice";
import userReducer from "./user/userSlice";
import orderReducer from "./order/ordersSlice";
import productReducer from "./product/productSlice";
import categoryReducer from "./category/categorySlice";
import purchaseReducer from "./purchases/productSlice";

export const store = configureStore({
  reducer: {
    loading: appReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    orders: orderReducer,
    purchase: purchaseReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
  ],
});

// trích xuất type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 1. Get the root state's type from reducers

// 2. Create a type for thunk dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

// 3. Create a type for store using RootState and Thunk enabled dispatch
export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};

export default store;
