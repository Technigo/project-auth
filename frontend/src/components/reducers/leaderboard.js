import { createSlice } from "@reduxjs/toolkit";

const leaderboard = createSlice({
    name:"leaderboard",
    initialState:{
        items:[],
        leaderboard:'',
        error:null
    },
    reducers:{
        setError:(store, action) =>{
            store.error = action.payload
        },
        setLeaderboard:(store, action) =>{
            store.leaderboard = action.payload
        }
    }
});


export default leaderboard