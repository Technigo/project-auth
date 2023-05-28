import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Initial state for the 'items' array
    error: null // Initial state for the 'error' value
};

export const thoughts = createSlice({
    name: 'thoughts', // Name of the slice
    initialState, // Initial state defined above
    reducers: {
        setItems: (store, action) => {
            store.items = action.payload; // Update the 'items' array in the store with the payload of the action
        },
        setNewThought: (store, action) => {
            store.newThought = action.payload; // Update the 'newThought' value in the store with the payload of the action
        },
        setError: (store, action) => {
            store.error = action.payload; // Update the 'error' value in the store with the payload of the action
        }
    }
});
