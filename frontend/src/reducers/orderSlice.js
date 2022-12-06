import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice ({
    name:"order",
    initialState:{
        flavor:[],
        scoop:null,
    },
    reducers:{
        setFlavor: (state, action) => {
            state.flavor = action.payload
        },
        setScoop: (state, action) => {
            state.scoop = action.payload
        }
    }
})

export default orderSlice;
export const {setFlavor, setScoop} = orderSlice.actions;