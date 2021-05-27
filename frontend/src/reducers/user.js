import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: null,
    // email: null, 
    accessToken: null, 
    errors: null,
    secretMessage: null,
}
const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (store, action) => {
            store.username = action.payload
        },
        // setEmail: (store, action) => {
        //     store.email = action.payload
        // },
        setAccessToken: (store, action) => {
            store.accessToken = action.payload
        },
        setErrors: (store, action) => {
            store.errors = action.payload
        },
        setSecretMessage: (store, action) => {
            store.secretMessage = action.payload
        },
        setLogout: (store, action) => {
            return initialState
        }
    }
})

export default user