import { createSlice } from '@reduxjs/toolkit';

export const thought = createSlice({
    name: 'thought',
    initialState: {
        items: [],
        error: null
    },
    reducers: {
        setItems: (store, action) => {
            store.items = action.payload;
        },
        // setUserName: (store, action) => {
        //     store.username = action.payload;
        // },????

    }
})