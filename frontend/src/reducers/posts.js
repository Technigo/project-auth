import { createSlice } from "@reduxjs/toolkit";

const posts = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        error: null
    },
    reducers: {
        setItems: (store, action) => {
            store.items = action.payload
        },
        // unshift() adds an element to the beginning of the array.
        setNewItems: (store, action) => {
            store.items.unshift(action.payload)
        },
        setError: (store, action) => {
            store.error = action.payload
        }
    }
})

export default posts