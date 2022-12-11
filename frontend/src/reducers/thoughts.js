import { createSlice } from "@reduxjs/toolkit";

const thoughts = createSlice({
    name: "thoughts",
    initialState: { // gets an array from the backend 
        items: [],
        error: null,
    },
    reducers: {
        setItems: (store, action) => {store.items = action.payload}, 
        setError: (store, action) => {store.error = action.payload},
    }
})

export default thoughts