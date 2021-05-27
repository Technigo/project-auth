import { createSlice } from '@reduxjs/toolkit'

export const thoughts = createSlice ({
    name:'thoughts',
    initialState: {
        items: [],
        errors: null
    },
    reducers: {
        setThoughts: (store, action) => {
            store.items = action.payload;
        },
        setErrors: (store, action) => {
            store.errors = action.payload;
        }
    }
})



