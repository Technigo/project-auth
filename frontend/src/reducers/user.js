import { createSlice } from "@reduxjs/toolkit"

const thoughts = createSlice({
    name: "user",
    initialState:{
        error: null,
        username: null,
        userId: null,
        accessToken: null
    },
    reducers: {
        setUsername: (store, actions) => {
            store.username = action.payload;
        },
        setError: (store, actions) => {
            store.error = action.payload;
        },
        setUserId: (store, actions) => {
            store.unserId = action.payload;
        },
        setAccessTokem: (store, actions) => {
            store.accessToken = action.payload;
        },
    }
})

export default user



/* import { createSlice } from "@reduxjs/toolkit"; 

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
}; */

