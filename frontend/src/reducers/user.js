import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    userId: null,
    userName: null,
    accessToken: null,
    error: null,
  },
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setUsername: (store, action) => {
      store.userName = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setErrors: (store, action) => {
      store.error = action.payload;
    },
  },
});

export default user;

// export const signUp = (userName, email, accessToken) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username: userName, email, accessToken }),
//   };

//   return (dispatch) => {
//     dispatch(ui.actions.setLoading(true));
//     fetch(SIGNUP_URL, options)
//       .then((res) => res.json())
//       .then((json) => {
//         setTimeout(() => dispatch(users.actions.setNewUser(json)), 800);
//         setTimeout(() => dispatch(ui.actions.setLoading(false)), 800);
//       });
//   };
// };
