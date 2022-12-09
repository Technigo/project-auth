import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name:"User",
    initialState:{
        username: null,
        userId: null,
        accessToken: null,
        error: null
    },
    reducers: {
        setUsername: (store, action) => {
            store.username = action.payload;
        },
        setError: (store, action) => {
            store.error = action.payload;
        },
        setUserId: (store, action) => {
            store.userId = action.payload;
        },
        setAccessToken: (store, action) => {
            store.accessToken = action.payload;
        }
    }
});

export default user;