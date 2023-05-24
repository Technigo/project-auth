import { createSlice } from "@reduxjs/toolkit";
// The code imports the createSlice function from the @reduxjs/toolkit library.

// The `thoughts` variable represents a Redux slice for managing thoughts-related state.

// initialState: An object representing the initial state of the thoughts slice.
// It contains two properties: items, initialized as an empty array, and error, initialized as null.
const thoughts = createSlice({
    name: "thoughts",
    initialState: {
        items: [],
        error: null
    },
    // reducers: An object containing action reducers for updating the state.
    // Two reducers are defined: setError and setItems.
    // These reducers update the error and items properties of the state, respectively, based on the payload provided in the dispatched action.
    reducers: {
        // Action reducer: Set error state
        setError: (store, action) => {
            store.error = action.payload;
        },
        // Action reducer: Set items state
        setItems: (store, action) => {
            store.items = action.payload;
        }
    }
});

export default thoughts;

// Finally, the thoughts slice is exported as the default export,
// allowing it to be used in other parts of the application
// to manage the thoughts-related state in Redux.
