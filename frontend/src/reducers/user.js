import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   login: {
//     accessToken: localStorage.accessToken || null,
//     username: null,
//     statusMessage: null,
//   },
// };

// initialState: {userId: null, username: null, accessToken: null, error: null}

const user = createSlice({
  name: 'user',
  initialState: {
    userId: null,
    username: null,
    accessToken: null,
    error: null,
  },
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setAccessToken: (store, action) => {
      // const { accessToken } = action.payload;
      store.accessToken = action.payload;
      // localStorage.setItem('accessToken', accessToken);
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    logout: (store, action) => {
      store.userId = null;
      store.username = null;
      store.accessToken = null;
      localStorage.removeItem('accessToken');
    },
  },
});

export default user;
