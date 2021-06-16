/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../utils/apiConfig';

export const getSecret = createAsyncThunk(
  'secret/fetchData',
  async (accessToken, thunkAPI) => {
    try {
      const response = await fetch(API_URL('secret'), {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = await response.json();
      if (response.status === 200) {
        return data.secret;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log('Error', error.response.data);
      thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const secretSlice = createSlice({
  name: 'secret',
  initialState: {
    message: '',
    reqSuccess: false,
    reqLoading: false,
    reqError: false,
    errorMessage: ''
  },
  reducers: {
    setSecret: (state, { payload }) => {
      state.message = payload
    }
  },
  extraReducers: {
    [getSecret.fulfilled]: (state, { payload }) => {
      state.reqLoading = false;
      state.reqSuccess = true;
      state.message = payload;
    },
    [getSecret.rejected]: (state, { payload }) => {
      state.reqLoading = false;
      state.reqError = true;
      state.errorMessage = payload.message;
    },
    [getSecret.pending]: (state) => {
      state.reqLoading = true;
    }
  }
});

export const { setSecret } = secretSlice.actions;
export const secretSelector = (store) => store.secret;
export default secretSlice.reducer;
