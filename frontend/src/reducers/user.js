import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: {
    accessToken: localStorage.accessToken || null,
    username: null,
    statusMessage: null,
  },
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setAccessToken: (store, action) => {
      const { accessToken } = action.payload;
      store.accessToken = action.payload;
      localStorage.setItem('accessToken', accessToken);
    },
    // setErrors: (store, action) => {
    //   store.errors = action.payload;
    // },
    logout: (store, action) => {
      store.login.username = null;
      store.login.accessToken = null;
      store.login.statusMessage = '';
      localStorage.removeItem('accessToken');
    },
  },
});

export default user;
