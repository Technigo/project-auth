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
  }
});

// Thunks
export const login = (email, password) => {
  const LOGIN_URL = 'http://localhost:8080/sessions';
  return (dispatch) => {
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      if (res.ok /* if 200, 201, 204 */) {
        return res.json();
      }
      throw 'Unable to sign in.';
    })
    .then((json) => {
      // Save the login info
      dispatch( user.actions.setAccessToken({ accessToken: json.accessToken }));
      dispatch(user.actions.setUserId({ userId: json.userId }));
      dispatch(user.actions.setStatusMessage({ statusMessage: 'Successful login' }));
    })
    .catch((err) => {
      // dispatch(user.actions.logout());
      dispatch(user.actions.setErrorMessage({ errorMessage: err }));
    });
};
};