import { createSlice } from "@reduxjs/toolkit";


const thoughts = createSlice({
    name: "thoughts",
    initialState: { // från backend kommer en array of stuff 
        items: [],
        error: null // denna finns för att det ska synas om det blir en error
    },
    reducers: {
        setItems: (store, action) => {store.items = action.payload}, 
        setError: (store, action) => {store.items = action.payload},
    }
})

export default thoughts