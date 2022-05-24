import { createSlice } from "@reduxjs/toolkit";

export const authenticated = createSlice({
    name: "authenticated",
    initialState: {
        authToken: "",
        username: "",
    },
    reducers: {
        login: (state, action) => {
            state.authToken = action.payload.authToken;
            state.username = action.payload.username;
        },
        logout: (state, action) => {
            state.authToken = "";
            state.username = "";
        }
    }
});
