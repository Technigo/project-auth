import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		username: null,
		accessToken: null,
		userId: null,
		error: null,
	},
	reducers: {
		addUsername: (state, action) => {
			state.username = action.payload;
		},
		addAccessToken: (state, action) => {
			state.accessToken = action.payload;
		},
		addUserId: (state, action) => {
			state.userId = action.payload;
		},
		catchError: (state, action) => {
			state.error = action.payload;
		},
		logOut: (state, action) => {
			(state.accessToken = null),
				(state.username = null),
				(state.userId = null),
				(state.error = null);
		},
	},
});

export default userSlice;
