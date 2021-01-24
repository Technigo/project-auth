import { createSlice } from '@reduxjs/toolkit';

import { USERS_URL, SESSIONS_URL } from '../urls';

const initialState = {
  login: {
    name: localStorage.name || '',
    userId: localStorage.userId || 0,
    secretMessage: '',
    errorMessage: '',
    accessToken: localStorage.accessToken || null,
  },
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (store, action) => {
      const { name } = action.payload;
      store.login.name = name;
      localStorage.setItem('name', name);
    },
    setUserId: (store, action) => {
      const { userId } = action.payload;
      store.login.userId = userId;
      localStorage.setItem('userId', userId);
    },
    setSecretMessage: (store, action) => {
      const { secretMessage } = action.payload;
      store.login.secretMessage = secretMessage;
    },
    setErrorMessage: (store, action) => {
      const { errorMessage } = action.payload;
      store.login.errorMessage = errorMessage;
    },
    setAccessToken: (store, action) => {
      const { accessToken } = action.payload;
      store.login.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
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
        if (res.ok) {
          return res.json();
        }
        throw new Error('Could not create new user');
      })
      .then(json => {
        dispatch(
          user.actions.setAccessToken({ accessToken: json.accessToken })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setName({ name: json.name }));
        dispatch(user.actions.setErrorMessage({ errorMessage: '' }));
      })
      .catch(err => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
  };
};

// Secret message
export const getSecretMessage = () => {
  return (dispatch, getStore) => {
    const accessToken = getStore().user.login.accessToken;
    const userId = getStore().user.login.userId;

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
        dispatch(user.actions.setSecretMessage({ secretMessage: json }));
      })
      .catch(err => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
  };
};

// Logout
export const logout = () => {
  return (dispatch, getStore) => {
    const accessToken = getStore().user.login.accessToken;
    fetch(`${USERS_URL}/logout`, {
      method: 'POST',
      headers: { Authorization: accessToken },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to logout');
        }
        return res.json();
      })
      .catch(err => {
        dispatch(
          user.actions.setErrorMessage({ errorMessage: err.toString() })
        );
      });
    dispatch(user.actions.setName({ name: '' }));
    dispatch(user.actions.setUserId({ userId: 0 }));
    dispatch(user.actions.setSecretMessage({ secretMessage: '' }));
    dispatch(user.actions.setErrorMessage({ errorMessage: '' }));
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    localStorage.removeItem('accessToken')
    localStorage.removeItem('name')
    localStorage.removeItem('userId')
  };
};
