import { createSlice } from '@reduxjs/toolkit';

const thoughts = createSlice({
  name: 'thoughts',
  initialState: {
    items: [],
    errors: null
  },
  reducers: {
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
    setItems: (store, action) => {
      store.items = action.payload;
    }
  }
});

export default thoughts;
