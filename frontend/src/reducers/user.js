import { createSlice } from '@reduxjs/toolkit';

import { USERS_URL, SESSIONS_URL } from '../urls';

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

// Login
export const login = (email, password) => {
  return dispatch => {
    fetch(SESSIONS_URL, {
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
      })
      .catch(err => {
        dispatch(logout());
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
  };
};

// Sign up
export const signUp = (name, email, password) => {
  return dispatch => {
    fetch(USERS_URL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Could not create new user');
        }
        return res.json;
      })
      .then(json => {
        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken,
          })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setName({ name: json.name }));
      })
      .catch(err => {
        dispatch(logout());
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
  };
};

// Secret message
export const getSecretMessage = () => {
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken;
    const userId = getState().user.login.userId;
    fetch(`${USERS_URL}/${userId}/secret`, {
      method: 'GET',
      headers: { Authorization: accessToken },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(
          'Could not get requested information. Make sure you are logged in and try again'
        );
      })
      .then(json => {
        dispatch(
          user.actions.setSecretMessage({ secretMessage: JSON.stringify(json) })
        );
      })
      .catch(err => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err.toString }));
      });
  };
};

// Logout
export const logout = () => {
  return dispatch => {
    dispatch(user.actions.setName({ name: '' }));
    dispatch(user.actions.setEmail({ email: '' }));
    dispatch(user.actions.setUserId({ userId: 0 }));
    dispatch(user.actions.setSecretMessage({ secretMessage: '' }));
    dispatch(user.actions.setErrorMessage({ errorMessage: '' }));
    dispatch(user.actions.setAccessToken({ accessToken: null }));
  };
};
