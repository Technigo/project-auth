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
      store.userID = acion.payload;
    },
    setUsername: (store, action) => {
      store.username = acion.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = acion.payload;
    },

    setError: (store, action) => {
      store.error = acion.payload;
    },
  },
});

export default user;
