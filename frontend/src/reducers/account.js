import { createSlice } from '@reduxjs/toolkit'

export const account = createSlice({
  name: 'account',
  initialState: { 
    signup: false,
   },
  reducers: {
    showSignupForm: (store, action) => {
      const setSignupForm = action.payload

      store.signup = setSignupForm
    }
  }
})