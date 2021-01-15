import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: {
    accessToken: null,
    name: '',
    userId: 0,
    loggedIn: false,
    statusMessage: '',
  },
}

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload
      state.login.accessToken = accessToken
    },
    setUserId: (state, action) => {
      const { userId } = action.payload
      state.login.userId = userId
    },
    setStatusMessage: (state, action) => {
      const { statusMessage } = action.payload
      state.login.statusMessage = statusMessage
    },
    toggleLoggedState: (state, action) => {
      state.login.loggedIn = action.payload
    },
    logout: (state, action) => {
      console.log('Logging out')
      state.login.userId = 0
      state.login.accessToken = null
    },
  },
})