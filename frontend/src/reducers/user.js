import { createSlice } from '@reduxjs/toolkit'

const initalState = {
  login: {
    accessToken: null,
    userId: 0,
    statusMessage: "",
  },
}

export const user = createSlice ({
  name: "user",
  initialState: initalState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload
      console.log(`Accss Token: ${accessToken}`)
      state.login.accessToken = accessToken
    },
    setUserId: (state, action) => {
      const { userId } = action.payload
      console.log(` User Id: ${userId}`)
      state.login.userId = userId
    },
    setStatusMessage: (state, action) => {
      const { statusMessage } = action.payload
      console.log(`Status Message : ${statusMessage}`)
      state.login.statusMessage = statusMessage
    },
    setLogout: (state, action) => {
      console.log(state.login.userId)
      state.login.userId = 0
      state.login.accessToken = null
      state.login.statusMessage = 'logged out'
    },
  },
})