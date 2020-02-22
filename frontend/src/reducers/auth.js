import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
    name: '',
    email: '',
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
        logout: (state, action) => {
            state.accessToken = ''
        },
        restart: () => {
            return initialState
        }
    }
})