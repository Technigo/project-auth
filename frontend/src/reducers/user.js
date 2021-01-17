import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    accessToken: null,
    userId: 0,
    name: "",
    statusMessage: "",
  },
};

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.login.accessToken = accessToken;
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      state.login.userId = userId;
    },
    setName: (state, action) => {
      const { name } = action.payload;
      state.login.name = name;
    },
    setStatusMessage: (state, action) => {
      const { statusMessage } = action.payload;
      state.login.statusMessage = statusMessage;
    },
    // When the logout function is called in both userProfile.js and status.js then the accessToken, userId and name are changed back to what they were in the initial state before the user was created or signed in
    logout: (state, action) => {
      state.login.accessToken = null;
      state.login.userId = 0;
      state.login.name = "";
    }
  },
});