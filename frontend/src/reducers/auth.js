import { createSlice } from '@reduxjs/toolkit'

export const auth = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: true,
    showSigninForm: false,
    user: {
      accessToken: '99068feb126b135d0788370c6ed69f2b200e31636123f83e7e4d01a077e4ac7af86a46096434ef8b9c10cdbe474599f790d3effdf5e11e054e31a1452f328b467a0b8ac2d25d9a7ce125a9e4058ae82ab2fbdae55f9452709806d8e58387c969f5c677102cdc97889caebb7205c47114e182104b5ebf7e97b46c5855a7c38398'
    }
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
    }

  }
})