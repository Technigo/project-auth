import { createSlice } from '@reduxjs/toolkit'


export const movies = createSlice({
    name: 'movies',
    initialState:{
        items: [],
        error: null
    },
    reducers: {
        setItems: (store, action) => {
            store.items = action.payload;
        },
        setError: (store, action) => {
            store.error = action.payload;
        }
    }
});
