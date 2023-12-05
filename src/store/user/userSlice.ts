import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payloadCreator } from "src/utils/utils";
import jwtDecode from "jwt-decode";
import { getAccessTokenFromLS } from "src/utils/auth";
import { toast } from "react-toastify";
import authApi from "src/api/auth/auth.api";

export const login = createAsyncThunk(
  "auth/login",
  payloadCreator(authApi.login),
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  payloadCreator(authApi.register),
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  payloadCreator(authApi.logout),
);
export const getUsers = createAsyncThunk(
  "auth/getUsers",
  payloadCreator(authApi.getUsers),
);

export const getDetailUser = createAsyncThunk(
  "auth/getDetailUser",
  payloadCreator(authApi.getDetailUser),
);
export const addUser = createAsyncThunk(
  "auth/addUser",
  payloadCreator(authApi.addUser),
);
export const uploadAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  payloadCreator(authApi.uploadAvatar),
);
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  payloadCreator(authApi.updateUserProfile),
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  payloadCreator(authApi.deleteUser),
);

interface DecodedToken {
  userId: number;
  permissions: number;
  username: string;
  userUuid: string;
}

interface IUser {
  name: string;
  accessToken: string;

  user: any;
  userDetail: any;
}

const initialState: IUser = {
  name: "admin",
  accessToken: "123",

  user: [],
  userDetail: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.accessToken = payload.data.accessToken;
    });
    // builder.addCase(addUser.fulfilled, (state, { payload }) => {
    //   state.user = payload.data;
    // });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.user = payload.data.data;
    });
    builder.addCase(getDetailUser.fulfilled, (state, { payload }) => {
      state.userDetail = payload.data?.data;
    });
    // builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
    //   state.user = payload.data;
    // });
    // builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
    //   state.user = payload.data;
    // });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;

