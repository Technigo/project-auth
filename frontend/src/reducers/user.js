import { createSlice } from '@reduxjs/toolkit'

const initialState= {
  login: {
    accessToken: null,
    userId: 0,
    statusMessage:'',
  }
}

export const user = createSlice({
  name:'user',
  initialState: initialState,
  reducers: {
    setAccessToken: ( state, action) => {
      const {accessToken} = action.payload
      console.log(`Access token: ${accessToken}`)
      state.login.accessToken = accessToken
    },
    SetUserId: (state, action) => {
      const { userId } = action.payload
      console.log(`User id: ${userId}`)
      state.login.userId = userId
    },
    setStatusMessage: (state, action) => {
      const { statusMessage } = action.payload
      state.login.statusMessage = statusMessage
    },
    logout: (state, action) => {
      console.log('logging out')
      state.login.userId = 0
      state.login.accessToken = null
    }, 
  }
})

export const logout = () => {
  return (dispatch) => {
    dispatch(user.actions.setSecretMessage({ secretMessage: null }));
    dispatch(user.actions.setErrorMessage({ errorMessage: null }));
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setUserId({ userId: 0 }));
  };
};