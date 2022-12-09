import { createSlice } from "@reduxjs/toolkit";

// passing intisal states
const thoughts = createSlice({
  name: "thoughts",
  initialState: {
    items: [],
    error: null,
  },
  // Steting Items & Error in reducers
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default thoughts