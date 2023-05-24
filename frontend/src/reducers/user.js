import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null, 
    username: null,
    userId: null,
    accessToken: null
  }

  export const user = createSlice({
    name: 'user',
    initialState, 
    reducers: {
      setUsername: (store, action) => {
          store.username = action.payload
          console.log(store.username)
      },
      setUserId: (store, action) => {
        store.userId = action.payload
      },
      setAccessToken: (store, action) => {
        store.accessToken = action.payload
      },
      setError: (store, action) => {
        store.error = action.payload
        }
    }
  })