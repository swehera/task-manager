import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskData: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addAllTasks: (state, action) => {
      state.taskData = action.payload;
    },
  },
});

export const { addAllTasks } = taskSlice.actions;

export default taskSlice.reducer;
