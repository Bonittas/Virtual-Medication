// store.js

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import postReducer from './reducers/postReducer';
import viewDoctors from './reducers/viewDoctors'
import viewPatients  from "./reducers/viewPatients";
import userReducer from "./reducers/profileReducer";
import notificationReducer from "./reducers/notificationReducer"
userReducer
const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  doctors: viewDoctors,
  patients: viewPatients,
  user: userReducer,
  notifications: notificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
