import { createSlice } from '@reduxjs/toolkit';

const secret = createSlice({
  name: 'secret',
  initialState: {
    message: null,
    errors: null,
  },
  reducers: {
    setSecret: (store, action) => {
      store.message = action.payload;
    },
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
  },
});

export default secret;
