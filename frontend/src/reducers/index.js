// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer'
import  viewDoctors  from './viewDoctors';
import viewPatients from './viewPatients';
import doctorProfile from "./profileReducer"
import notificationReducer from './notificationReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  doctors: viewDoctors,
  patients:viewPatients,
  doctorProfile: doctorProfile,
  notifications: notificationReducer

});

export default rootReducer;
