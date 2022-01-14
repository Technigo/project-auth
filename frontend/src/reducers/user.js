import { createSlice } from "@reduxjs/toolkit";

const initialUser = {
  id: null,
  email: "",
  accessToken: null,
};

const user = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
  },
  reducers: {
    setUser: (store, action) => {
      store.user = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setAccessToken: (store, action) => {
      store.user.accessToken = action.payload;
    },

    setInitialUser: (store, action) => {
      store.user = initialUser;
    },
  },
});

export default user;
