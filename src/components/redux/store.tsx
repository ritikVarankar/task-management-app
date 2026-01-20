import { configureStore } from "@reduxjs/toolkit";
import registerUsers from './registerUserReducer';
import tasks from './tasksReducer';

export const store = configureStore({
  reducer: {
    registerUsers:registerUsers,
    tasks:tasks
  }
});
