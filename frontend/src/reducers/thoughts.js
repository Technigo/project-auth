import { createSlice } from '@reduxjs/toolkit'

// store username and accessToken
const thoughts = createSlice({
  name: 'thoughts',
  initialState: {
    items: [],
  },
  reducers: {
    setThoughts: (store, action) => {
      store.items = action.payload
    },
  }
})

export default thoughts 