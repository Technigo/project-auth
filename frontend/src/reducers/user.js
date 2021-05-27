import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: "user", 
  initialState: {
    userId: null,
    username: null,
    accessToken: null,
    feelings:[], 
    errors: null
  }, 
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setFeelings: (store, action) => {
      store.feelings = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default user