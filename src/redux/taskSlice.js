// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   taskData: [],
// };

// export const taskSlice = createSlice({
//   name: "task",
//   initialState,
//   reducers: {
//     saveTask: (state, action) => {
//       // state.taskData.push(action.payload);
//       state.taskData = action.payload;
//     },
//     addAllTasks: (state, action) => {
//       // state.taskData = action.payload;
//       state.taskData.push(action.payload);
//     },
//   },
// });

// export const { saveTask, addAllTasks } = taskSlice.actions;

// export default taskSlice.reducer;

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

// Don't forget to combine the reducer in your root reducer
