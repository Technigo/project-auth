import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: {
    accessToken: localStorage.accessToken || null,
    userId: localStorage.userId || 0,
    secretMessage: null,
    errorMessage: null
  }
};

export const user = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      console.log(`Access Token: ${accessToken}`);
      state.login.accessToken = accessToken;
      localStorage.setItem('accessToken', accessToken);
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      console.log(`User Id: ${userId}`);
      state.login.userId = userId;
      localStorage.setItem('userId', userId);
    },
    setSecretMessage: (state, action) => {
      const { secretMessage } = action.payload;
      console.log(`Secret Message: ${secretMessage}`);
      state.login.secretMessage = secretMessage;
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload;
      console.log(`Error Message: ${errorMessage}`);
      state.login.errorMessage = errorMessage;
    }
  }
});

// Thunks
// Signup
export const signup = (name, email, password) => {
  const SIGNUP_URL = 'http://localhost:8080/signup';
  return (dispatch) => {
    fetch(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (!res.ok /* if not 200, 201, 204 */) {
          throw 'Could not create account.  Try a different username.';
        }

        // OK
        return res.json();
      })
      .then((json) => {
        // Save the login info
        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken
          })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};

// Login
export const login = (email, password) => {
  const LOGIN_URL = 'http://localhost:8080/login';
  return (dispatch) => {
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => {
        if (res.ok /* if 200, 201, 204 */) {
          return res.json();
        }

        // Not OK
        throw 'Unable to sign in. Please check your username and password are correct';
      })
      .then((json) => {
        // Save the login info
        dispatch(
          user.actions.setAccessToken({
            accessToken: json.accessToken
          })
        );
        dispatch(user.actions.setUserId({ userId: json.userId }));
        dispatch(user.actions.setErrorMessage({ errorMessage: null }));
      })
      .catch((err) => {
        dispatch(logout());
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};

// SecretMesssage
export const getSecretMessage = () => {
  const USERS_URL = 'http://localhost:8080/users';
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken;
    const userId = getState().user.login.userId;
    // Include userId in the path
    fetch(`${USERS_URL}/${userId}/secret`, {
      method: 'GET',
      // Include the accessToken to get the protected endpoint
      headers: { Authorization: accessToken }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw 'Could not get information. Make sure you are logged in and try again.';
      })
      // SUCCESS: Do something with the information we got back
      .then((json) => {
        dispatch(
          user.actions.setSecretMessage({ secretMessage: JSON.stringify(json) })
        );
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };
};

// Logout
export const logout = () => {
  return (dispatch) => {
    dispatch(user.actions.setSecretMessage({ secretMessage: null }));
    dispatch(user.actions.setErrorMessage({ errorMessage: null }));
    dispatch(user.actions.setAccessToken({ accessToken: null }));
    dispatch(user.actions.setUserId({ userId: 0 }));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
  };
};
