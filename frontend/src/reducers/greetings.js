import { createSlice } from "@reduxjs/toolkit";

const greetings = createSlice({
  name: "greetings",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default greetings;
