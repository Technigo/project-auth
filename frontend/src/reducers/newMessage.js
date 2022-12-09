import { createSlice } from "@reduxjs/toolkit";

const newMessage = createSlice({
  name: "newMessage",
  initialState: {
    message: '',
    createdAt: '',
    hearts: 0
  },
  reducers: (action, state) => {
    setNewMessage
  }
})