import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    login: {
        userName: "",
        password: "",
        accessToken: "",
        userId: "",
    }
    
}

export const user = createSlice({
    name: "user",
    initialState,
    reducers: {
      setAccessToken: (store, action) => {
            const accessToken = action.payload;
            console.log(`Access token: ${accessToken}`);
            store.login.accessToken = accessToken;
        },
        setUserId: (store, action) => {
            const userId = action.payload;
            console.log(`User id: ${userId}`);
            store.login.userId = userId;
        },
        logout: (store, action) => {
            console.log("logging out");
            store.login.userId = 0;
            store.login.accessToken = null;
        },
    }
})