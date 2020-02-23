import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loggedIn: false,
    name: '',
    email: '',
    userId: '',
    accessToken: '',
    secrets: [],
    userID: ''
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload
        },
        setUser: (state, action) => {
<<<<<<< HEAD
            state.userID = action.payload
        },
        logout: (state, action) => {
            state.accessToken = ''
=======
            state.userId = action.payload
>>>>>>> ce3b63ccbfa661e96f8e94c7ba4a2ea39f912dcd
        },
        logout: () => {
            return initialState
        }
    }
})