import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import category from "./categorySlice";
import tasks from "./taskSlice";

export const store = configureStore({
  reducer: {
    user: user,
    category: category,
    tasks: tasks,
  },
});
