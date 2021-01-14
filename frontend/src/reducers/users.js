import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    accessToken: '',
    name: '',
  },
  isLoggedIn: false,
};

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user.accessToken = action.payload.accessToken;
      state.user.name = action.payload.name;
    },
    logOut: (state, action) => {
      state.user.accessToken = '';
      state.isLoggedIn = false;
    },

    // Petra: La till en funktion som togglar isloggedin-state,
    // så att vi bara aktiverar det när login är successfull!
    toggleLoggedInOut: (state, action) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const manageUser = ({ url, user }) => {
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => {
        if (res.ok === false) {
          return res.json();
        } else {
          dispatch(users.actions.toggleLoggedInOut());
          return res.json();
        }
      })
      .then((json) => {
        if (json.message) {
          console.error(json.message);
        } else {
          dispatch(users.actions.logIn(json));
        }
      });
  };
};
