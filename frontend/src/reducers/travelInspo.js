import { createSlice } from '@reduxjs/toolkit'

const travelInspo = createSlice ({
  name: 'travelInspo',
  initialState: {
    inspo: null
  },
  reducers: {
    setTravelInspo: (store, action) => {
      store.inspo = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    },
    setSignOut: (store, action) => {
      store.inspo = null
    }
  }
})

export default travelInspo