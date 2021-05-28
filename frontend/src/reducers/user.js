import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('user') 
  ? {
    userId: JSON.parse(localStorage.getItem('user')).userId,
    username: JSON.parse(localStorage.getItem('user')).username,
    accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
    feelings: [],
    errors: null
  } 
  : {
    userId: null,
    username: null,
    accessToken: null,
    feelings:[], 
    errors: null
  }

const user = createSlice({
  name: "user", 
  initialState, 
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