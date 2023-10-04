import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
  },
  reducers: {
    updateChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const { updateChats } = chatsSlice.actions;
export default chatsSlice.reducer;
