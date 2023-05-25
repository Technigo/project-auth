import { createSlice } from "@reduxjs/toolkit";

const memes = createSlice({
    name: "memes",
    initialState: {
        memeItems: [],
        error: null
    },
    reducers: {
        setMemeItems: (store, action) => {
            store.memeItems = action.payload
        },
        setError: (store, action) => {
            store.error = action.payload
        }
    }
})

export default memes