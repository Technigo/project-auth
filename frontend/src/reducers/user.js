import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from 'utils/utils';

const user = createSlice({
  name: 'user',
  initialState: {
    error: null,
    username: null,
    userId: null,
    accessToken: null
  },
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    }
  }
});

export const logIn = (mode, username, password) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    };

    fetch(API_URL(mode), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setUserId(data.response.id));
          dispatch(user.actions.setAccessToken(data.response.accessToken));
          dispatch(user.actions.setError(null));
        } else {
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setError(data.response));
        }
      });
  };
};

export default user;
