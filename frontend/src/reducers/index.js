// src/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer'
import  viewDoctors  from './viewDoctors';
import viewPatients from './viewPatients';
import doctorProfile from "./profileReducer";
import patientProfile from "./profileReducer"
import notificationReducer from './notificationReducer';
import profileReducer from './patientReducer';
const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  doctors: viewDoctors,
  patients:viewPatients,
  doctorProfile: doctorProfile,
  patientProfile: patientProfile,
  profile: profileReducer,

  notifications: notificationReducer

});

export default rootReducer;
