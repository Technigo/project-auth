import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    error: null,
    username: null,
    accessToken: null,
    UserId: null
  },
  reducers: {
    setError: (store, action) => {
      store.error = action.payload
    },
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setUserId: (store, action) => {
      store.UserId = action.payload
    }
    }
})

export default user