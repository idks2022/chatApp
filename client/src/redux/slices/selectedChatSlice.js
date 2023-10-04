import { createSlice } from "@reduxjs/toolkit";

const selectedChatSlice = createSlice({
  name: "selectedChat",
  initialState: {
    selectedChat: {},
  },
  reducers: {
    updateSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
});

export const { updateSelectedChat } = selectedChatSlice.actions;
export default selectedChatSlice.reducer;
