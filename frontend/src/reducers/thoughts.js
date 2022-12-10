import { createSlice } from "@reduxjs/toolkit";


const thoughts = createSlice({
    name: "thoughts",
    initialState: { // från backend kommer en array of stuff 
        items: [],
        error: null, // denna finns för att det ska synas om det blir en error
    },
    reducers: {
<<<<<<< HEAD
        setItems: (store, action) => {store.items = action.payload;}, 
        setError: (store, action) => {store.error = action.payload;},
=======
        setItems: (store, action) => {store.items = action.payload}, 
        setError: (store, action) => {store.error = action.payload},
>>>>>>> cf6d5694a4c06fb7a89acf9ade61f593a013b785
    }
})

export default thoughts