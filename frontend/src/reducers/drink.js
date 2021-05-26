import { createSlice } from '@reduxjs/toolkit'

const drink = createSlice({
    name: 'drink',
    initialState: {
        items: [],
        errors: null
    },
    reducers: {
        setDrink: (store, action) => {
            store.items = action.payload
        },
        setErrors: (store, action) => {
            store.errors = action.payload
        }
    }
})

export default drink