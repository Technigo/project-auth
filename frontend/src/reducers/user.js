import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
	name: "user",
	initialState: {
		userId: null,
		username: null,
		accessToken: null,
		error: null,
	},
	reducers: {
		setUserId: (store, action) => {
			store.userId = action.payload;
		},
		setUsername: (store, action) => {
			store.username = action.payload;
		},
		setAccessToken: (store, action) => {
			store.accessToken = action.payload;
			localStorage.setItem("token", action.payload);
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
		setLogOut: (store) => {
			store.username = null;
			store.accessToken = null;
		},
	},
});

export default user;
