import { createSlice } from "@reduxjs/toolkit";

const thoughts = createSlice({
    name: "user",
    initialState: {
        items:[],
        error: null
    },
    reducers: {
        setError: (store, action) => {
            store.error = action.payload
        },
        setItems: (store, action) => {
            store.items = action.payload
        }
    }
});

export default thoughts;