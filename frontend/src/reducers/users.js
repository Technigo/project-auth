import { createSlice } from "@reduxjs/toolkit";

const URL = "https://riddlemaster.herokuapp.com/";

export const users = createSlice({
  name: "users",
  initialState: {
    username: null,
    accessToken: null,
    securityLevel: null,
    riddle: null,
    error: null,
    answer: null,
  },
  reducers: {
    setUser: (store, action) => {
      store.username = action.payload.response.username;
      store.accessToken = action.payload.response.accessToken;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setRiddles: (store, action) => {
      store.securityLevel = action.payload.response.securityLevel;
      store.riddle = action.payload.response.riddles;
      store.answer = action.payload.response.correct;
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
    //   dispatch(ui.actions.setLoading(true));

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

    // .finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 2000));
  };
};

export const riddles = (accessToken) => {
  return (dispatch) => {
    //   dispatch(ui.actions.setLoading(true));

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
      });
    // .finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 2000));
  };
};

export const checkAnswer = (accessToken, answer) => {
  return (dispatch) => {
    //   dispatch(ui.actions.setLoading(true));

    fetch(URL + "answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify({ answer }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          dispatch(users.actions.setRiddles(json));
          dispatch(users.actions.setError(null));
        } else {
          dispatch(users.actions.setError(json));
        }
      });
    // .finally(setTimeout(() => dispatch(ui.actions.setLoading(false)), 2000));
  };
};
