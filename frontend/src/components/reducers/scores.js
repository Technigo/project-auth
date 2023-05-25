import { createSlice } from "@reduxjs/toolkit";

const score = createSlice({
    name:"score",
    initialState:{
        items:[],
        totalScore:0,
        error:null
    },
    reducers:{
        setError:(store, action) =>{
            store.error = action.payload
        },
        setScore:(store, action) =>{
            store.score = action.payload
        }
    }
});


export default score