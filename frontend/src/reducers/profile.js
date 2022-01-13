import { createSlice } from '@reduxjs/toolkit';

const profile = createSlice({
	name: 'profile',
	initialState: {
		message: null,
		error: null,
	},
	reducers: {
		setMessage: (store, action) => {
			store.message = action.payload;
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
	},
});

export default profile;
