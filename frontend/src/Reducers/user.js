import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: 'user',
    initialState: {
        id: null,
        name: null,
        email: null,
        accessToken: null,
        error: null,
    },

    reducers: {
        setUserId: (state, action) => {
            state.id = action.payload;

        },
        setUserName: (state, action) => {
            state.name = action.payload;

        },
        setUserEmail: (state, action) => {
            state.email = action.payload;

        },
        setUserAccessToken: (state, action) => {
            state.accessToken = action.payload;

        },
        setError: (state, action) => {
            state.error = action.payload;

        },


    }

})
