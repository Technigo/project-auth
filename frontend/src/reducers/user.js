import { createSlice } from '@reduxjs/toolkit'

// add user to localStorage 
const initialState = localStorage.getItem('user')
    ? {
        username: JSON.parse(localStorage.getItem('user')).username,
        accessToken: JSON.parse(localStorage.getItem('user')).accessToken, 
        errors: null,
        secretMessage: null
    }
    : {
        username: null,
        accessToken: null, 
        errors: null,
        secretMessage: null
    }

const user = createSlice({
    name: 'user',
    initialState,
    // : { 
    //   username: null,
    //   accessToken: null, 
    //   errors: null,
    //   secretMessage: null
    // },
    reducers: {
        setUsername: (store, action) => {
            store.username = action.payload
        },
        setAccessToken: (store, action) => {
            store.accessToken = action.payload
        },
        setErrors: (store, action) => {
            store.errors = action.payload
        },
        setSecretMessage: (store, action) => {
            store.secretMessage = action.payload
        }
    }
})

export default user