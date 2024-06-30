// import { configureStore } from "@reduxjs/toolkit";
// import { createStore } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for we
// import user from "./userSlice";
// import category from "./categorySlice";
// import tasks from "./taskSlice";

// export const store = configureStore({
//   reducer: {
//     user: user,
//     category: category,
//     tasks: tasks,
//   },
// });

/*

// after persistor add
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import user from "./userSlice";
import category from "./categorySlice";
import tasks from "./taskSlice";

// Define the persist configuration
const persistConfig = {
  key: "root", // The key for the persisted state
  storage, // The storage engine to use (defaults to localStorage)
};

// Combine the slices into a single reducer object
const rootReducer = combineReducers({
  user: user,
  category: category,
  tasks: tasks,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor object
export const persistor = persistStore(store);
*/

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
