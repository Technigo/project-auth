import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
	name: 'user',
	initialState: {
		userId: null,
		email: null,
		accessToken: null,
		error: null,
	},
	reducers: {
		setUserId: (store, action) => {
			store.userId = action.payload;
		},
		setEmail: (store, action) => {
			store.email = action.payload;
		},
		setAccessToken: (store, action) => {
			store.accessToken = action.payload;
		},
    deleteAccessToken: (store, action) => {
      store.accessToken = null;
    },
    deleteUserId: (store, action) => {
      store.userId = null;
    },
		setError: (store, action) => {
			store.error = action.payload;
		},
	},
});

export default user;
