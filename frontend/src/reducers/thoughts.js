import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from 'utils/utils';

const thoughts = createSlice({
  name: 'Thoughts',
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

export default thoughts;