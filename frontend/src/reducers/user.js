import { createSlice } from "@reduxjs/toolkit";
import { Link, useHistory } from 'react-router-dom'

const initialState = {
  login: {
    accessToken: null,
    userId: 0,
    errorMessage: null,
    secretMessage: null,
    userName: null,
  },
};

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    //setLoginResponse that contains both accesstoken and userid 
    setLoginResponse: (state, action) => {
      const { accessToken, userId } = action.payload
      console.log(`Access Token: ${accessToken}, User Id: ${userId}`)
      state.login.accessToken = accessToken
      state.login.userId = userId
    },
    /* setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      console.log(`Access Token: ${accessToken}`);
      state.login.accessToken = accessToken;
    },
    setUserId: (state, action) => {
      const { userId } = action.payload;
      console.log(`User Id: ${userId}`);
      state.login.userId = userId;
    }, */
    setSecretMessage: (state, action) => {
      const { secretMessage } = action.payload;
      console.log(`Secret Message: ${secretMessage}`);
      state.login.secretMessage = secretMessage;
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload;
      console.log(`Error Message: ${errorMessage}`);
      state.login.errorMessage = errorMessage;
    },
    setUserName: (state, action) => {
      const { userName } = action.payload;
      console.log(`User name: ${userName}`);
      state.login.userName = userName;
    },
  },
});

//Thunks
export const login = (name, password) => {
  const LOGIN_URL = 'https://authentication-jj.herokuapp.com/sessions'
  // const history = useHistory()
  return (dispatch) => {
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(console.log('Logging in...'))
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw 'Unable to log in. Please check your username and password'
      })
      .then((json) => {
        console.log(json)
        // Save the login info 
        dispatch(user.actions.setLoginResponse({ accessToken: json.accessToken, userId: json.userId })
        );
        dispatch(user.actions.setUserName({ userName: json.name }))
        // history.push('/secret'); // it is complaining about the use of history here.
        // dispatch(user.actions.setSecretMessage({ secretMessage: JSON.stringify(json) }))
      })
      // SUCCESS: Do something with the information we got back

      .catch((err) => {
        dispatch(logout()) //not sure if this is needed here
        // dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      });
  }
}

export const logout = () => {
  return (dispatch) => {
    console.log('trying to log out ...')
    dispatch(user.actions.setLoginResponse({ accessToken: null, userId: 0 }))
    dispatch(user.actions.setSecretMessage({ secretMessage: null }))
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))
  }
}


export const getSecretMessage = () => {
  const USERS_URL = 'https://authentication-jj.herokuapp.com/users';
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken
    const userId = getState().user.login.userId
    fetch(`${USERS_URL}/${userId}/secret`, {
      method: 'GET',
      // Include the accessToken to get the protected endpoint
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw 'Could not get information. Make sure you are logged in and try again.'
      })
      // SUCCESS: Do something with the information we got back
      .then((json) => {
        dispatch(user.actions.setSecretMessage({ secretMessage: JSON.stringify(json) }))
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      }); //401
  }
  // Include userId in the path

};
