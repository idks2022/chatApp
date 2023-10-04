import { configureStore } from "@reduxjs/toolkit";
//import chatsReducer from "./slices/chatsSlice";
//import usersReducer from "./slices/usersSlice";
import messagesReducer from "./slices/messagesSlice";
import selectedChatReducer from "./slices/selectedChatSlice";
import notificationsReducer from "./slices/notificationsSlice";

const store = configureStore({
  reducer: {
    //chats: chatsReducer,
    //users: usersReducer,
    messages: messagesReducer,
    selectedChat: selectedChatReducer,
    notifications: notificationsReducer,
  },
});

export default store;
