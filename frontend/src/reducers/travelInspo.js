import { createSlice } from '@reduxjs/toolkit'

const travelInspo = createSlice ({
  name: 'travelInspo',
  initialState: {
    inspo: []
  },
  reducers: {
    setTravelInspo: (store, action) => {
      store.inspo = action.payload
    }
  }
})

export default travelInspo