import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    user: {
      id: null,
      email: "",
      accessToken: null,
    },
    error: null,
  },
  reducers: {
    setUser: (store, action) => {
      console.log(action.payload);
      store.user = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default user;
