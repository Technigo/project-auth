import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    error: null
  }

  export const thoughts = createSlice({
    name: 'thoughts',
    initialState, 
    reducers: {
      setItems: (store, action) => {
        store.items = action.payload
      },
      setNewThought: (store, action) => {
        store.newThought = action.payload
      },
      setError: (store, action) => {
        store.error = action.payload
        }
    }
  })