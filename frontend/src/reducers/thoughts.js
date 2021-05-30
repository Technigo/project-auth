import { createSlice } from "@reduxjs/toolkit";

const thoughts = createSlice({
  name: "thoughts",
  initialState: {
    items: [
      {
        _id: "ksjhfj",
        message: "Nothing to see here, move along!",
      },
    ],
    errors: null,
  },
  reducers: {
    setThoughts: (store, action) => {
      store.items = action.payload;
    },

    setErrors: (store, action) => {
      store.errors = action.payload;
    },
  },
});

export default thoughts;
