import { createSlice } from '@reduxjs/toolkit'

export const account = createSlice({
  name: 'account',
  initialState: { 
    id: null,
    username: null,
    email: null,
    accessToken: null,
    errors: null, 
    signup: false
  },
  reducers: {
    setID: (store, action) => {
      store.id = action.payload
    },

    setUsername: (store, action) => {
      store.username = action.payload
    },

    setEmail: (store, action) => {
      store.email = action.payload
    },

    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },

    setErrors: (store, action) => {
      store.errors = action.payload
    },

    showSignupForm: (store, action) => {
      store.signup = action.payload
    },
    
    logIn: (store, action) => {
      store.logedIn = action.payload
    },

    logOut: (store, action) => {
      store.accessToken = null
      store.id = null
      store.username = null
      store.email = null
    }
  }
})