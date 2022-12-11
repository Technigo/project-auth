import { createSlice } from '@reduxjs/toolkit';

const thoughts = createSlice({
  name: 'Thoughts',
  initialState: {
    items: [],
    error: null,
    loading: false
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setLoading: (store, action) => {
      store.loading = action.payload;
    }
  },
});

export default thoughts;