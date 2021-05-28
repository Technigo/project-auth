import { createSlice } from '@reduxjs/toolkit'

const user = createSlice ({
  name: 'user',
  initialState: {
    username: null,
    accessToken: localStorage.getItem('accessToken') || null,
    errors: null,
  },
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
      localStorage.setItem('accessToken', store.accessToken)
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    },
    setSignOut: (store, action) => {
      store.username = null
      store.accessToken = null
      store.errors = null
      localStorage.removeItem('accessToken')
    }
  }
})

export default user