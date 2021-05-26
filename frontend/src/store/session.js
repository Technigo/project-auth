import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    authenticated: null,
    user: {},
  },
  reducers: {
    login(state, action) {
      state.authenticated = true;
      // state.user = { ...action.payload };
    },
    logout(state) {
      state.authenticated = false;
      state.user = {};
    }
  },
});


export const { login, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
