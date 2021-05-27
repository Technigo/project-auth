import { createSlice } from '@reduxjs/toolkit'

// store username and accessToken
const user = createSlice({
  name: 'user',
  initialState: {
    email: null,
    accessToken: null,
    errors: null
  },
  reducers: {
    setUsername: (store, action) => {
      store.email = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    },
  }
})

export default user 