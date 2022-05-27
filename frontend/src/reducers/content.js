import { createSlice } from "@reduxjs/toolkit"

const content = createSlice({
    name: "content",
    initialState: {
        items: [],
        error: null
    },
    reducers: {
        setItems: (store, action) => {
            store.items = action.payload
        },
        setError: (store, action) => {
            store.error = action.payload
        }
    }
})

export default content