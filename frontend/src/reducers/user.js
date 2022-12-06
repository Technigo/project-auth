import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    accessToken: null,
    // password?  
    // userId?
    // maybe loadin - om vi vill ha en sån sida?
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
        }
    }
})

export default user