import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./slices/chatsSlice";
import messagesReducer from "./slices/messagesSlice";
import usersReducer from "./slices/usersSlice";
import selectedChatReducer from "./slices/selectedChatSlice";

const store = configureStore({
  reducer: {
    chats: chatsReducer,
    messages: messagesReducer,
    users: usersReducer,
    selectedChat: selectedChatReducer,
  },
});

export default store;
