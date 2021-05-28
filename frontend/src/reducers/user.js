import { createSlice } from '@reduxjs/toolkit'

// add user to localStorage
const initialState = localStorage.getItem('user') 
   ? {
    email: JSON.parse(localStorage.getItem('user')).email,
    accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
    errors: null
  }
  : {
    email: null,
    accessToken: null,
    errors: null
  }

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (store, action) => {
      store.email = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    },
    setReturnInitialState: () => {
      return initialState
    }
  }
})

export default user 