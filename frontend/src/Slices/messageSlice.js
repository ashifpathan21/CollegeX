import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMessages: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setAllMessages(state, action) {
      state.allMessages = action.payload;
    },
  },
});

export const { setAllMessages } = messageSlice.actions;
export default messageSlice.reducer;
