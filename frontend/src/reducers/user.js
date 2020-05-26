import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    accessToken: null,
    userId: 0,
    statusMessage: "",
  },
};

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    //setLoginResponse that contains both accesstoken and userid 
    setLoginResponse: (state, action) => {
      const { accessToken, userId, statusMessage } = action.payload
      console.log(`Access Token: ${accessToken}, User Id: ${userId}, Status Message: ${statusMessage}`)
      state.login.accessToken = accessToken
      state.login.userId = userId
      state.login.statusMessage = statusMessage;
    },
    /* setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      console.log(`Access Token: ${accessToken}`);
      state.login.accessToken = accessToken;
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      console.log(`User Id: ${userId}`);
      state.login.userId = userId;
    }, */
    /* setStatusMessage: (state, action) => {
      const { statusMessage } = action.payload;
      console.log(`Status Message: ${statusMessage}`);
      state.login.statusMessage = statusMessage;
    }, */
    logout: (state, action) => {
      console.log("Logging out");
      state.login.userId = 0;
      state.login.accessToken = null;
    },
  },
});