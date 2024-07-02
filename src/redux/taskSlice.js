import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskData: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addAllTasks: (state, action) => {
      const newTasks = action.payload.filter(
        (newTask) => !state.taskData.some((task) => task._id === newTask._id)
      );
      state.taskData = [...state.taskData, ...newTasks];
    },
    deleteTask: (state, action) => {
      state.taskData = state.taskData.filter(
        (task) => task._id !== action.payload
      );
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      const index = state.taskData.findIndex(
        (task) => task._id === updatedTask._id
      );
      if (index !== -1) {
        state.taskData[index] = updatedTask;
      }
    },
  },
});

export const { addAllTasks, deleteTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
