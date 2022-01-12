import { createSlice } from '@reduxjs/toolkit';
const user = createSlice({
  name: 'user',
  initialState: {
    usedId: null,
    username: null,
    accessToken: null,
    error: null,
  },
  reducers: {
    setUserId: (store, action) => {
      store.userID = action.payload;
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },

    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default user;
