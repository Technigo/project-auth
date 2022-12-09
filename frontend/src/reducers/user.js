import { createSlice } from "@reduxjs/toolkit";

// The Redux store
export const user = createSlice({
    name: "user",
    initialState: {
        id: null,
        username: null,
        accessToken: null,
        error: null,
        secretMessage: null,
},
    reducers: {
        setUserId: (store, action) => {
            store.id = action.payload;
        },
        setUserName: (store, action) => {
            store.username = action.payload;
        },
        setAccessToken: (store, action) => {
            store.accessToken = action.payload;
        },
        setError: (store, action) => {
            store.error = action.payload;
        },
        setSecretMessage: (store, action) => {
            store.secretMessage = action.payload;
        },
        logOut: () => {
            return initialState
        }
    }
});