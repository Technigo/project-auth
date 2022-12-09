import { createSlice } from "@reduxjs/toolkit";

// null is a defual of value
const user = createSlice({
  name: "user",
  initialState: {
    error: null,
    name: null,
    id: null,
    accessToken: null,
  },
  // Steting Items & Error in reducers
  reducers: {
    setName: (store, action) => {
      store.name = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setId: (store, action) => {
      store.id = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
  },
});

export default user;
