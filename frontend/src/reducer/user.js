import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: null,
    username: null,
    userId: null,
    accessToken: null
};

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        signOut: () => { return initialState }
    }
});