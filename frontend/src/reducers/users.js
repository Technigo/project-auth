import { createSlice } from "@reduxjs/toolkit";

export const users = createSlice({
    name: "users",
    initialState: {
        username: "",
        accessToken: "",
        securityLevel: 0,
    },
    reducers: {
        setUser: (store, action) => {
            console.log(action.payload)
            store.username = action.payload.username;
            store.accessToken = action.payload.accessToken
        },
    },
});

export const createUser = (username, password) => {
    return (dispatch) => {
        // we'll probably want a loader of some kind, I'm keeping this line as a reminder
        //   dispatch(ui.actions.setLoading(true));

        // using localhost as the api url now, will become the heroku backend url
        fetch("http://localhost:8080/" + "signup", {
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
