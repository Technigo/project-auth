import { createSlice } from "@reduxjs/toolkit";


const User = createSlice({
  name: "user",
  initialState: {
    username: null,
    password: null,
    accessToken:null,
   userId:null
  },

  reducers: {
    
    setUserId:(store, action) => {
      store.username = action.payload
    }
  }
});

/* Fetch fungerar lös att lägga in sökresultat i hotels */


export const { user } = User.actions;

export default User.reducer;
