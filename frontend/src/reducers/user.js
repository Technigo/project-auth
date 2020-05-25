import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: false,
  userId: '',
  accessToken: ''
}

export const users = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    // logIn: (state, action) => {
    //   state.loggedIn = action.payload
    // },
    logIn: (state) => {
      state.loggedIn = true
    },

    // logOut: (state) => {
    //   state.loggedIn = false
    // },

    logOut: () => {
      return initialState
    },

    access: (state, action) => {
      state.accessToken = action.payload
    },
    id: (state, action) => {
      state.userId = action.payload
    }
  },
})
