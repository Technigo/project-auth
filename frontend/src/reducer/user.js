import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: {
        userName: "",
        accessToken: null,
        userId: "",
        statusMessage: "",
    }
};

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAccessToken: (store, action) => {
            const accessToken = action.payload;
            store.login.accessToken = accessToken;
        },
        setUserId: (store, action) => {
            const userId = action.payload;
            store.login.userId = userId;
        },
        setUserName: (store, action) => {
            const userName = action.payload;
            store.login.userName = userName;
        },
        setStatusMessage: (store, action) => {
            const statusMessage = action.payload;
            store.login.statusMessage = statusMessage;
        },
        logout: (store, action) => {
            store.login.userId = 0;
            store.login.accessToken = null;
            store.login.userName = '';
        },
    }
});