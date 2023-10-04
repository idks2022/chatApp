import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
  },
  reducers: {
    updateMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { updateMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
