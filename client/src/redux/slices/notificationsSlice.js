import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  },
  reducers: {
    updateNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

export const { updateNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
