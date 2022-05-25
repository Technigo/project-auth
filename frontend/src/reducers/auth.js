import { createSlice } from "@reduxjs/toolkit";

export const authenticated = createSlice({
  name: "authenticated",
  initialState: {
    userId: null,
    authToken: "",
    username: "",
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.authToken = action.payload.authToken;
      state.username = action.payload.username;
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
