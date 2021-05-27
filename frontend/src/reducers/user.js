import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name:'user',
  initialState: {
    username: null,
    accessToken: localStorage.getItem('accessToken') 
      ? localStorage.getItem('accessToken') 
      : null,
    errors: null
  }, 
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload
    }, 
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
      window.localStorage.setItem('accessToken', action.payload)
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default user