// taskSlice.js (or similar file)

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskData: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addAllTasks: (state, action) => {
      state.taskData.push(action.payload);
    },
    // Add more reducers if needed
  },
});

export const { addAllTasks } = taskSlice.actions;
export default taskSlice.reducer;
