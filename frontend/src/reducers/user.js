import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    accessToken: null,
    userId: 0,
    statusMessage: "",
    errorMessage: null,
  }
};

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.login.accessToken = accessToken;
    },

    setUserId: (state, action) => {
      const { userId } = action.payload;
      state.login.userId = userId;
    },

    setStatusMessage: (state, action) => {
      const { statusMessage } = action.payload;
      state.login.statusMessage = statusMessage;
    },

    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload;
      state.login.errorMessage = errorMessage;
    },

    logout: (state, action) => {
      state.login.userId = 0;
      state.login.accessToken = null;
      state.login.secretMessage = null;
    },
  }
});

const LOGIN_URL = 'https://reveal-secrets-gabriella-sara.herokuapp.com/sessions';
const SIGNUP_URL = 'https://reveal-secrets-gabriella-sara.herokuapp.com/users';

// Thunks

// For LOGIN
export const login = (email, password) => {
  return (dispatch) => {
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw 'Unable to Log In.';
      })
      .then((json) => {
        // Save the login info
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
        dispatch(user.actions.setStatusMessage({ statusMessage: 'Successful Log In!' }));
      })
      .catch((err) => {
        dispatch(user.actions.logout());
        dispatch(user.actions.setAccessToken({ accessToken: null }));
        dispatch(user.actions.setStatusMessage({ statusMessage: 'Failed to login' }));
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};

// For SIGNUP
export const signup = (name, email, password) => {
  return (dispatch) => {
    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password, email }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (!res.ok) {
          throw 'Unable to Sign up, please check your e-mail and password.';
        } else {
          return res.json();
        }
      })
      .then((json) => {
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }));
        dispatch(user.actions.setStatusMessage({ statusMessage: 'Successful Sign Up' }));
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};
