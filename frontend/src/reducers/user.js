import { createSlice } from '@reduxjs/toolkit'

export const users = createSlice({
  name: 'userList',
  initialState: {
    loggedIn: false,
    userId: '',
    accessToken: ''
  },
  reducers: {
    // logIn: (state, action) => {
    //   state.loggedIn = action.payload
    // },
    logIn: (state) => { state.loggedIn = true },

    access: (state, action) => {
      state.accessToken = action.payload
    },
    id: (state, action) => {
      state.userId = action.payload
    }
  },
})

