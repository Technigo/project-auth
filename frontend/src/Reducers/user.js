import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    accessToken: null,
    userId: 0,
    loggedIn: false,
    errorMessage: null,
    secretMessage: null,
  },
};

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      console.log("This is the payload:", action.payload);
      console.log(`This is the accessToken: ${accessToken}`);
      state.login.accessToken = accessToken;
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      console.log(`This is the payload: ${action.payload}`);
      console.log(`This is the userId: ${userId}`);
      state.login.userId = userId;
    },
    // toggleUserLogin: (state, action) => {
    //   state.login.loggedIn = action.payload;
    // },

    logOut: (state, action) => {
      state.login.userId = 0;
      state.login.accessToken = null;
    },
    setSecretMessage: (state, action) => {
      const { secretMessage } = action.payload;
      console.log(`This is the secret message payload: ${secretMessage}`);
      state.login.secretMessage = secretMessage;
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload;
      state.login.errorMessage = errorMessage;
    },
  },
});

export const login = (username, password) => {
  const LOGIN_URL = "http://localhost:8080/sessions";
  return dispatch => {
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw "An error occured, check your credentials";
      })
      .then(json => {
        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken,
          })
        );
        console.log("Logged in!");
        dispatch(user.actions.setUserId({ userId: json.userId }));
      });
    dispatch(user.actions.toggleUserLogin(true)).catch(err => {
      console.log(err);
    });
  };
};

export const logOut = () => {
  return dispatch => {
    console.log("Logging out!");
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setUserId({ userId: 0 }));
  };
};
