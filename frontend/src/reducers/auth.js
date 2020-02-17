import { createSlice } from '@reduxjs/toolkit'

export const auth = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    showSigninForm: false
  },
  reducers: {
    toggleSigninForm: (state, action) => {
      state.showSigninForm = !state.showSigninForm
    }

  }
})