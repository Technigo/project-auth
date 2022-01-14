import { createSlice } from "@reduxjs/toolkit";

const thoughts = createSlice({
  name: "thoughts",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setNewItems: (store, action) => {
      store.items = [action.payload, ...store.items];
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default thoughts;
