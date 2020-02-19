import { createSlice } from '@reduxjs/toolkit'

export const auth = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    showSigninForm: true,
    isRegistrated: false,
    user: {}
  },
  reducers: {
    toggleSigninForm: (state, action) => {
      state.showSigninForm = !state.showSigninForm
    },
    logInUser: (state, action) => {
      state.isLoggedIn = true
      state.user = {
        id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        accessToken: action.payload.accessToken
      }
    },
    logOutUser: (state, action) => {
      state.isLoggedIn = false
      state.user = {}
    },
    userRegistrated: (state, action) => {
      state.isRegistrated = true
      state.user = {
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
        accessToken: action.payload.accessToken
      }

    }

  }
})