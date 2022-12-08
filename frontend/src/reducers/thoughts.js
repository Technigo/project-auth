import { createSlice } from "@reduxjs/toolkit"

const thoughts = createSlice({
    name: "thoughts",
    initialState:{
        items:[],
        error: null
    },
    reducers: {
        setItems: (store, actions) => {
            store.items = action.payload;
        },
        setError: (store, actions) => {
            store.error = action.payload;
        }
    }
})

export default thoughts