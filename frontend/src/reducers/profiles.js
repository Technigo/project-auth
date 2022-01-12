import { createSlice } from '@reduxjs/toolkit'

const profiles = createSlice({
  name: 'profiles',
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
  },
})

export default profiles