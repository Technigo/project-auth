/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import _ from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../utils/apiConfig';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, { payload }) => {
      return _.omit(payload, '__v')
    }
  }
});

export const { setUser } = userSlice.actions;
export const userSelector = (store) => store.user;
export default userSlice.reducer;
