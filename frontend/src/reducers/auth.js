import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => { state.isAuthenticated = true },
    logout: (state) => { state.isAuthenticated = false }
  }
})