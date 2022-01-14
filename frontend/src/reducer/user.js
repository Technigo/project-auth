import { createSlice } from "@reduxjs/toolkit";


const User = createSlice({
  name: "user",
  initialState: {
    userId: null,
    username: null,
    /* password: null, */
    accessToken:null,
    error: null,
  },

  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});


export default User;
