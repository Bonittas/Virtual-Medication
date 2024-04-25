// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer'
import  viewDoctors  from './viewDoctors';
import viewPatients from './viewPatients';
const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  doctors: viewDoctors,
  patients:viewPatients
});

export default rootReducer;
