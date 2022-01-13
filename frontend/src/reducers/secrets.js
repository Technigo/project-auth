import { createSlice } from '@reduxjs/toolkit';

const secrets = createSlice({
  name: 'secrets',
  initialState: {
    items: [
      { id: 1, text: 'Super ' },
      { id: 2, text: 'secret ' },
      { id: 3, text: 'message!' }
    ],
    error: null
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    }
  }
});

export default secrets;
