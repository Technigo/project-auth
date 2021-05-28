import { createSlice } from '@reduxjs/toolkit'

const secrets = createSlice({
  name: 'secrets',
  initialState: {
    items: [],
    errors: null
  },
  reducers: {
    setSecrets: (store, action) => {
      store.items = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    },
    addNewSecret: (store, action) => {
      store.items = [action.payload, ...store.items]
    }
  }
})

export default secrets