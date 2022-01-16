import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    error: null,
};

export const manga = createSlice({
    name: 'manga',
    initialState,

    reducers: {
        setItems: (store, action) => {
            store.items = action.payload;
        },
        setError: (store, action) => {
            store.error = action.payload;
        },
        setclearManga: () => {
            return initialState
        }
    },
});

