import { createSlice } from "@reduxjs/toolkit";


const Tought = createSlice({
  name: "tought",
  initialState: {
    items: null,
  
  },

  reducers: {
    
    setUserId:(store, action) => {
      store.item = action.payload
    }
  }
});

/* Fetch fungerar lös att lägga in sökresultat i hotels */


export const { user } = User.actions;

export default Tought.reducer;
