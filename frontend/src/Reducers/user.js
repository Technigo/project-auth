import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    accessToken: localStorage.accessToken || null,
    userId: localStorage.userId || 0,
    errorMessage: null,
    secretMessage: null,
  },
};

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.login.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      state.login.userId = userId;
      localStorage.setItem("userId", userId);
    },

    logOut: (state, action) => {
      state.login.userId = 0;
      state.login.accessToken = null;
      state.login.errorMessage = null;
      state.login.secretMessage = null;
      localStorage.clear();
    },
    setSecretMessage: (state, action) => {
      const { secretMessage } = action.payload;
      state.login.secretMessage = secretMessage;
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload;
      state.login.errorMessage = errorMessage;
    },
  },
});
