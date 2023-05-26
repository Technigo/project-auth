import { createSlice } from '@reduxjs/toolkit';

export const loading = createSlice({
  name: 'loading',
  initialState: {
    isLoading: true
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})