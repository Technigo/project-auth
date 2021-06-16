/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../utils/apiConfig';
import { setUser } from './user'

export const registerUser = createAsyncThunk(
  'session/register',
  async (userData, thunkAPI) => {
    try {
      const response = await fetch(API_URL('signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...userData })
      });
      const data = await response.json();
      if (response.status === 201) {
        thunkAPI.dispatch(setUser({ ...data.user }));
        return data.accessToken;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log('Error', error.response.data);
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'session/login',
  async (loginData, thunkAPI) => {
    try {
      const response = await fetch(API_URL('login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...loginData })
      });
      const data = await response.json();
      if (response.status === 200) {
        thunkAPI.dispatch(setUser({ ...data.user }));
        return data.accessToken;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log('Error', error.response.data);
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    accessToken: null,
    reqSuccess: false,
    reqLoading: false,
    reqError: false,
    errorMessage: ''
  },
  reducers: {
    clearRequests: (state) => {
      state.reqError = false;
      state.reqLoading = false;
      state.reqSuccess = false;
    },
    logoutUser: (state) => {
      state.accessToken = null;
    }
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.reqLoading = false;
      state.reqSuccess = true;
      state.accessToken = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.reqLoading = false;
      state.reqError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.reqLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.reqLoading = false;
      state.reqSuccess = true;
      state.accessToken = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.reqLoading = false;
      state.reqError = true;
      state.errorMessage = payload.message;
    },
    [registerUser.pending]: (state) => {
      state.reqLoading = true;
    }
  }
});

export const { clearRequests, logoutUser } = sessionSlice.actions;
export const sessionSelector = (store) => store.session;
export default sessionSlice.reducer;
