import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	login: {
		userId: 0,
		accessToken: null,
		statusMessage: '',
		secretMessage: '',
		loggedIn: false,
	},
};

export const user = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setAccessToken: (state, action) => {
			const { accessToken } = action.payload;
			console.log(`Access Token:${accessToken}`);
			state.login.accessToken = accessToken;
		},
		setUserId: (state, action) => {
			const { userId } = action.payload;
			console.log(`UserId:${userId}`);
			state.login.userId = userId;
		},
		setStatusMessage: (state, action) => {
			const { statusMessage } = action.payload;
			state.login.statusMessage = statusMessage;
		},
		setSecretMessage: (state, action) => {
			const { secretMessage } = action.payload;
			console.log(`Secretmessage in reducer:${secretMessage}`);
			state.login.secretMessage = secretMessage;
		},
		toggleLoggedState: (state, action) => {
			const isLoggedIn = action.payload;
			console.log(isLoggedIn);
			state.login.loggedIn = action.payload;
			if (isLoggedIn === false) {
				state.login.accessToken = null;
			}
		},
		logout: (state, action) => {
			console.log('Logging out');
			state.login.userId = 0;
			state.login.accessToken = null;
			state.login.statusMessage = 'Logged out';
			state.login.secretMessage = '';
			state.login.loggedIn = false;
		},
	},
});
