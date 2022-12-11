import { createSlice } from "@reduxjs/toolkit";

const thoughts = createSlice({
    name:"thoughts",
    initialState:{
        items: ["Let us see if this works."],
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

export default thoughts;