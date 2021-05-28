import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  username: null,
  email: null,
  accessToken: null,
  errors: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (store, action) => {
      store.name = action.payload;
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
    setLogOut: () => {
      return {
        name: null,
        username: null,
        email: null,
        accessToken: null,
        errors: null,
      };
    },
  },
});

export default user;
