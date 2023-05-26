import { createSlice } from "@reduxjs/toolkit";

const thoughts = createSlice({
    name: "thoughts",
    initialState: {
        items: [],
        error: null,
        likeThought: 1
    },
    reducers: {
        setError: (store, action) => {
            store.error = action.payload
        },
        setItems: (store, action) => {
            store.items = action.payload
        },
        setLikeThought: (store, action) => {
            store.likeThought = action.payload
          },
    }
});

export default thoughts