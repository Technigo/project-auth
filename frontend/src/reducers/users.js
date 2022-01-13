import { createSlice } from "@reduxjs/toolkit";

const URL = "http://localhost:8080/";

export const users = createSlice({
  name: "users",
  initialState: {
    username: null,
    accessToken: null,
    securityLevel: null,
    riddle: null,
    error: null,
  },
  reducers: {
    setUser: (store, action) => {
      console.log(action.payload);
      store.username = action.payload.response.username;
      store.accessToken = action.payload.response.accessToken;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setRiddles: (store, action) => {
      console.log("this is the riddles reducer");
      store.securityLevel = action.payload.response.securityLevel;
      store.riddle = action.payload.response.riddles;
    },
    setUserToLoggedOut: (store) => {
      store.username = null;
      store.accessToken = null;
      store.securityLevel = 1;
      store.riddle = null;
    },
  },
});

export const userSignUpOrLogIn = (username, password, mode) => {
  return (dispatch) => {
    // we'll probably want a loader of some kind, I'm keeping this line as a reminder
    //   dispatch(ui.actions.setLoading(true));

    // using localhost as the api url now, will become the heroku backend url
    fetch(URL + mode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          dispatch(users.actions.setUser(json));
          dispatch(users.actions.setError(null));
        } else {
          dispatch(users.actions.setError(json));
          dispatch(users.actions.setUserToLoggedOut());
        }
      });
    // turn the loading state back off
    // .finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 2000));
  };
};

export const riddles = (accessToken) => {
  return (dispatch) => {
    // we'll probably want a loader of some kind, I'm keeping this line as a reminder
    //   dispatch(ui.actions.setLoading(true));

    // using localhost as the api url now, will become the heroku backend url
    fetch(URL + "riddles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          dispatch(users.actions.setRiddles(json));
          dispatch(users.actions.setError(null));
        } else {
          dispatch(users.actions.setError(json));
        }
        console.log("WE made it", accessToken);
      });
    // turn the loading state back off
    // .finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 2000));
  };
};
