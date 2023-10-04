import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [], // Each element: { chatId: 'someId', unreadCount: 5 }
  },
  reducers: {
    updateNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    addNotification: (state, action) => {
      const chatId = action.payload;
      const existingNotification = state.notifications.find(
        (n) => n.chatId === chatId
      );

      if (existingNotification) {
        // If the chatId already exists, increment its unread count
        existingNotification.unreadCount += 1;
      } else {
        // If not, add a new notification for that chatId with unreadCount as 1
        state.notifications.push({ chatId, unreadCount: 1 });
      }
    },
    deleteNotification: (state, action) => {
      const chatId = action.payload;
      const index = state.notifications.findIndex((n) => n.chatId === chatId);

      if (index !== -1) {
        state.notifications.splice(index, 1);
      }
    },
    resetNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  updateNotifications,
  addNotification,
  deleteNotification,
  resetNotifications,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
