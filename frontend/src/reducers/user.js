import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    accessToken: null,
    error: null,
    userId: null 
    // maybe loading - om vi vill ha en sån sida?
  };

const user = createSlice({
    name: 'user',
    initialState, 
    reducers: {
        setUserName: (store, action) => {
            store.username = action.payload;
        },
        setAccessToken: (store, action) => {
            store.accessToken = action.payload;
        },
        setUserId: (store, action) => {
            store.accessToken = action.payload;
        },
        setError: (store, action) => {
            store.accessToken = action.payload;
        }
    }
})

export default user