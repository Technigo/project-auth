import { createSlice } from '@reduxjs/toolkit'

export const account = createSlice({
  name: 'account',
  initialState: { 
    signup: false,
    logedIn: false
   },
  reducers: {
    showSignupForm: (store, action) => {
      const setSignupForm = action.payload

      store.signup = setSignupForm
    },
    
    logIn: (store, action) => {
      const setLogedIn = action.payload

      store.logedIn = setLogedIn
    }
  }
})