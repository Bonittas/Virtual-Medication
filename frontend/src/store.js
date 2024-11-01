// store.js

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import postReducer from './reducers/postReducer';
import viewDoctors from './reducers/viewDoctors'
const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  doctors: viewDoctors,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
