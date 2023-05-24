import { createSlice } from "@reduxjs/toolkit";

// The `user` variable represents a Redux slice for managing user-related state.
// name: The name of the slice, set to "user".
const user = createSlice({
    name: "user",
    // name: The name of the slice, set to "user".
    initialState: {
        // initialState: An object representing the initial state of the user slice.
        // It contains four properties: username, userId, accessToken, and error, all initially set to null.
        username: null,
        userId: null,
        accessToken: null,
        error: null
    },

    // reducers: An object containing action reducers for updating the state.
    // Four reducers are defined: setUsername, setUserId, setAccessToken, and setError.
    // These reducers update the corresponding properties of the state based on the payload provided in the dispatched action.
    reducers: {
        // Action reducer: Set username state
        setUsername: (store, action) => {
            store.username = action.payload;
        },
        // Action reducer: Set userId state
        setUserId: (store, action) => {
            store.userId = action.payload;
        },
        // Action reducer: Set accessToken state
        setAccessToken: (store, action) => {
            store.accessToken = action.payload;
        },
        // Action reducer: Set error state
        setError: (store, action) => {
            store.error = action.payload;
        }
    }
});

export default user;
//Finally, the user slice is exported as the default export,
// allowing it to be used in other parts of the application
// to manage the user-related state in Redux.