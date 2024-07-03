// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import tasksReducer from "./taskSlice";

const userPersistConfig = {
  key: "user",
  storage,
};

const categoryPersistConfig = {
  key: "category",
  storage,
};

const tasksPersistConfig = {
  key: "tasks",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCategoryReducer = persistReducer(
  categoryPersistConfig,
  categoryReducer
);
const persistedTasksReducer = persistReducer(tasksPersistConfig, tasksReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    category: persistedCategoryReducer,
    tasks: persistedTasksReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
