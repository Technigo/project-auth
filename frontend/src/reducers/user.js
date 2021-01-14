import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: false,
  userId: '',
  accessToken: ''
}

export const user = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    
    logIn: (state) => {
      state.loggedIn = true
    },

    logOut: () => {
      return initialState
    },

    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    
    id: (state, action) => {
      state.userId = action.payload
    }
  },
})