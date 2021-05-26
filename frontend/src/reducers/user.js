import { createSlice } from '@reduxjs/toolkit'

const user = createSlice({
  name: 'user',
  initialState: {
    username: null,
    accessToken: null,
    errors: null
  },
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setAcessToken: (store, action) => {
      store.acessToken = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }

})

export default user