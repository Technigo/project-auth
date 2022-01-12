import { createSlice } from '@reduxjs/toolkit';

const cats = createSlice({
  name: 'cats',
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setErrors: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default cats;
