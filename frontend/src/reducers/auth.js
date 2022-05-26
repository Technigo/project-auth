import { createSlice } from "@reduxjs/toolkit";

export const authenticated = createSlice({
  name: "authenticated",
  initialState: {
    userId: null,
    authToken: null,
    username: null,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.authToken = action.payload.accessToken;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
    },
    logout: (state, action) => {
      state.authToken = "";
      state.username = "";
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
