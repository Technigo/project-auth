import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: {
    accessToken: null,
    userId: 0,
    errorMessage: null,
    loginMessage: null,
  },
};

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      console.log(`Access Token: ${accessToken}`);
      state.login.accessToken = accessToken;
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      console.log(`User Id: ${userId}`);
      state.login.userId = userId;
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload;
      console.log(`Error Message: ${errorMessage}`);
      state.login.errorMessage = errorMessage;
    },
    setLoginMessage: (state, action) => {
      const { loginMessage } = action.payload;
      console.log(`Secret Message: ${loginMessage}`);
      state.login.loginMessage = loginMessage;
    },
  },
});

export const login = (name, password) => {
  const LOGIN_URL = 'http://localhost:8080/sessions';
  // const LOGIN_URL = 'https://project-authorize.herokuapp.com/sessions';
  return (dispatch) => {
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw 'Please, try again';
      })
      .then((json) => {
        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken,
          })
        );
        dispatch(user.actions.setUserId({ userId: json.userID }));
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};

export const getLoginMessage = () => {
  const USERS_URL = 'http://localhost:8080/users';
  // const USERS_URL = 'https://project-authorize.herokuapp.com/users';
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken;
    const userId = getState().user.login.userId;
    fetch(`${USERS_URL}/${userId}`, {
      method: 'GET',
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw 'Please, try again.';
      })
      .then((json) => {
        dispatch(
          user.actions.setLoginMessage({ loginMessage: json.stringify(json) })
        );
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};
