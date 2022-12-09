import { createSlice } from '@reduxjs/toolkit';
import { API_URL } from 'utils/utils';

const thoughts = createSlice({
  name: 'thoughts',
  initialState: {
    items: [],
    error: null
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    }
  }
});

export const getThoughts = () => {
  return (dispatch, getState) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken
      }
    };
    fetch(API_URL('thoughts'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(thoughts.actions.setItems(data.response));
          dispatch(thoughts.actions.setError(null));
        } else {
          dispatch(thoughts.actions.setItems([]));
          dispatch(thoughts.actions.setError(data.response));
        }
      });
  };
};

export default thoughts;
