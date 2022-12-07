import { createSlice } from "@reduxjs/toolkit"; 

export const user = createSlice({
    name: "user", 
    initialState: {
        userId: null, 
        accessToken: null, 
        //errorMessage: null
    }, 
    reducers: {
        setUserId: (state, action) => {
            const { userId } = action.payload;
            state.userId = userId; 
        }, 
        setAccessToken: (state, action) => {
            const { accessToken } = action.payload; 
            state.accessToken = accessToken; 
        }
    }
});

export const login = (username, password) => {
    return (dispatch) => {
        fetch 
    }
};