import { createSlice } from "@reduxjs/toolkit";

const secrets = createSlice({
    name: "secrets",
    initialState: {
        items: [],
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

export default secrets;