import { createSlice } from "@reduxjs/toolkit";

const URL = "http://localhost:8080/";

export const users = createSlice({
  name: "users",
  initialState: {
    username: "",
    accessToken: "",
    securityLevel: 0,
    riddle: "",
  },
  reducers: {
    setUser: (store, action) => {
      console.log(action.payload);
      store.username = action.payload.response.username;
      store.accessToken = action.payload.response.accessToken;
    },
    setRiddles: (store, action) => {
      console.log("this is the riddles reducer");
      store.securityLevel = action.payload.response.securityLevel;
      store.riddle = action.payload.response.riddles;
    },
  },
});

export const createUser = (username, password) => {
  return (dispatch) => {
    // we'll probably want a loader of some kind, I'm keeping this line as a reminder
    //   dispatch(ui.actions.setLoading(true));

    // using localhost as the api url now, will become the heroku backend url
    fetch(URL + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        dispatch(users.actions.setUser(json));
      });
    // turn the loading state back off
    // .finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 2000));
  };
};
export const signinUser = (username, password) => {
  return (dispatch) => {
    // we'll probably want a loader of some kind, I'm keeping this line as a reminder
    //   dispatch(ui.actions.setLoading(true));

    // using localhost as the api url now, will become the heroku backend url
    fetch(URL + "signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        dispatch(users.actions.setUser(json));
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
        console.log("WE made it", accessToken);
        dispatch(users.actions.setRiddles(json));
      });
    // turn the loading state back off
    // .finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 2000));
  };
};
