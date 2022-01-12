import { createSlice } from '@reduxjs/toolkit';
const user = createSlice({
  name: 'thoughts',
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.Items = acion.payload;
    },

    setError: (store, action) => {
      store.error = acion.payload;
    },
  },
});

export default thoughts;
