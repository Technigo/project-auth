import { createSlice } from '@reduxjs/toolkit'

const info = createSlice({
  name: 'info',
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export default info
