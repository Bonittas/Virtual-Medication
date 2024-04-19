
import {
    VIEW_PATIENTS_REQUEST,
    VIEW_PATIENTS_SUCCESS,
    VIEW_PATIENTS_FAILURE,
    VERIFY_PATIENT_SUCCESS,
    UNVERIFY_PATIENT_SUCCESS,
  } from '../actions/actionTypes';
  
  const initialState = {
    doctors: [],
    loading: false,
    error: null,
  };
  
  const patientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case VIEW_PATIENTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case VIEW_PATIENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          patients: action.payload,
        };
      case VIEW_PATIENTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case VERIFY_PATIENT_SUCCESS:
      case UNVERIFY_PATIENT_SUCCESS:
        return {
          ...state,
          patients: state.patients.map((doctor) =>
          patient._id === action.payload ? { ...patient, verified: !patient.verified } : patient
          ),
        };
      default:
        return state;
    }
  };
  
  export default patientsReducer;
  