import { createSlice } from '@reduxjs/toolkit';

const thoughtSlice = createSlice({
	name: 'thoughts',
	initialState: {
		value: [],
		error: null,
	},
	reducers: {
		addThoughts: (state, action) => {
			state.value = [...action.payload]; // getting everything from the array, hence all the posts
		},
	},
});

export default thoughtSlice
