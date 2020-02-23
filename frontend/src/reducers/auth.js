import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
    name: '',
    email: '',
    userId: '',
    accessToken: '',
    signUp: false
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload
        },
        setUser: (state, action) => {
            state.userId = action.payload
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload
        },
        setSignedUp: (state, action) => {
            state.signUp = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        logout: () => {
            return initialState
        }
    }
})