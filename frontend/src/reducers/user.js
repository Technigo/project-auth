import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    userID: null,
    accessToken: localStorage.getItem('token'),
    errors: null,
  },
  reducers: {
    setUser: (store, action) => {
      const { userID, accessToken, errors } = action.payload;
      store.userID = userID;
      store.accessToken = accessToken;
      store.errors = errors;
    },
  },
});

export default user;
