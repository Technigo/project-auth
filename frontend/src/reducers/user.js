import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    accessToken: "",
    userId: "",
  },
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.login.accessToken = accessToken;
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      state.login.userId = userId;
    },
  }
});