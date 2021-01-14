import { createSlice } from '@reduxjs/toolkit';

import { SIGNIN_URL, SIGNUP_URL } from '../urls';

const initialState = {
  login: {
    name: '',
    email: '',
    userId: 0,
    secretMessage: '',
    errorMessage: '',
    accessToken: null,
  },
};

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setName: (state, action) => {
      const { name } = action.payload;
      state.login.name = name;
    },
    setEmail: (state, action) => {
      const { email } = action.payload;
      state.login.email = email;
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      state.login.userId = userId;
    },
    setSecretMessage: (state, action) => {
      const { secretMessage } = action.payload;
      state.login.secretMessage = secretMessage;
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload;
      state.login.errorMessage = errorMessage;
    },
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.login.accessToken = accessToken;
    },
  },
});

// Thunks
export const login = (email, password) => {
  return dispatch => {
    fetch(SIGNIN_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(
          'Unable to sign in. Please check that e-mail and password are correct'
        );
      })
      .then(json => {
        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken,
          })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setName({ name: json.name }));
      });
    //       catch((err) => {
    //         dispatch(logout())
    // dispatch(user.actions.setErrorMessage({errorMessage: err.toString()}))
    //       })
  };
};
