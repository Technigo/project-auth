import { createSlice } from '@reduxjs/toolkit';

const secrets = createSlice({
	name: 'secrets',
	initialState: {
		items: [], //list of secrets
		error: null,
	},
	reducers: {
		setItems: (store, action) => {
			store.items = action.payload;
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
	},
});

export default secrets;
