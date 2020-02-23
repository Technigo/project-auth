import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
    name: '',
    email: '',
    userId: '',
    accessToken: '',
    secrets: []
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
        logout: () => {
            return initialState
        }
    }
})