import { createSlice } from '@reduxjs/toolkit'

const user = createSlice ({
  name: 'user',
  initialState: {
    members: [],
    error: '',
    loading: false
  }
})

export default user