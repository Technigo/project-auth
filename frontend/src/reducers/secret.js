import { createSlice } from '@reduxjs/toolkit';

const secret= createSlice({
    name: 'secret',
    initialState: {
        secret: null
    },
    reducers: {
        setSecret: (store, action) => {
            store.secret = action.payload;
            
        }
    }
})

export default secret;