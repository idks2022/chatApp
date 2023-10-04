import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { updateUsers } = usersSlice.actions;
export default usersSlice.reducer;
