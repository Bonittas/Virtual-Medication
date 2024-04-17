// reducers/doctors.js

import {
    VIEW_DOCTORS_REQUEST,
    VIEW_DOCTORS_SUCCESS,
    VIEW_DOCTORS_FAILURE,
    VERIFY_DOCTOR_SUCCESS,
    UNVERIFY_DOCTOR_SUCCESS,
  } from '../actions/actionTypes';
  
  const initialState = {
    doctors: [],
    loading: false,
    error: null,
  };
  
  const doctorsReducer = (state = initialState, action) => {
    switch (action.type) {
      case VIEW_DOCTORS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case VIEW_DOCTORS_SUCCESS:
        return {
          ...state,
          loading: false,
          doctors: action.payload,
        };
      case VIEW_DOCTORS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case VERIFY_DOCTOR_SUCCESS:
      case UNVERIFY_DOCTOR_SUCCESS:
        return {
          ...state,
          doctors: state.doctors.map((doctor) =>
            doctor._id === action.payload ? { ...doctor, verified: !doctor.verified } : doctor
          ),
        };
      default:
        return state;
    }
  };
  
  export default doctorsReducer;
  