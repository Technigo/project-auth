import { createSlice } from "@reduxjs/toolkit";

const userprofile = createSlice({
  name: "userprofile",
  initialState: {
    profile: "",
    error: null,
  },
  reducers: {
    setProfile: (store, action) => {
      store.profile = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default userprofile;
