import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [], // Each document: { userId: 'the recieving user', chatId: 'someId', unreadCount: 5, latestMessage: 'someMessage'  }
  },
  reducers: {
    addNotification: (state, action) => {
      const { newMessage, userId } = action.payload;
      const chatId = newMessage.chat._id;
      const existingNotification = state.notifications.find(
        (n) => n.chatId === chatId && n.userId === userId
      );

      if (existingNotification) {
        // If the userId and chatId combination already exists, increment its unread count and update the latest message
        existingNotification.unreadCount += 1;
        existingNotification.latestMessage = newMessage.content;
      } else {
        // If not, add a new notification for that chatId with unreadCount as 1
        state.notifications.push({
          userId,
          chatId,
          unreadCount: 1,
          latestMessage: newMessage.content,
        });
      }
    },
    deleteNotification: (state, action) => {
      const { userId, chatId } = action.payload;
      const index = state.notifications.findIndex(
        (n) => n.chatId === chatId && n.userId === userId
      );

      if (index !== -1) {
        state.notifications.splice(index, 1);
      }
    },
    resetNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, deleteNotification, resetNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
