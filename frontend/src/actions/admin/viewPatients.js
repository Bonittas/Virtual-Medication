// actions/patientActions.js

import axios from 'axios';

// Action types
export const VIEW_PATIENTS_REQUEST = 'VIEW_PATIENTS_REQUEST';
export const VIEW_PATIENTS_SUCCESS = 'VIEW_PATIENTS_SUCCESS';
export const VIEW_PATIENTS_FAILURE = 'VIEW_PATIENTS_FAILURE';
export const VERIFY_PATIENT_SUCCESS = 'VERIFY_PATIENT_SUCCESS';
export const VERIFY_PATIENT_FAILURE = 'VERIFY_PATIENT_FAILURE';
export const UNVERIFY_PATIENT_SUCCESS = 'UNVERIFY_PATIENT_SUCCESS';
export const UNVERIFY_PATIENT_FAILURE = 'UNVERIFY_PATIENT_FAILURE';

// Action creators
export const viewPatientsRequest = () => ({
  type: VIEW_PATIENTS_REQUEST
});

export const viewPatientsSuccess = (patients) => ({
  type: VIEW_PATIENTS_SUCCESS,
  payload: patients
});

export const viewPatientsFailure = (error) => ({
  type: VIEW_PATIENTS_FAILURE,
  payload: error
});

export const verifyPatientSuccess = (patientId) => ({
  type: VERIFY_PATIENT_SUCCESS,
  payload: patientId
});

export const verifyPatientFailure = (error) => ({
  type: VERIFY_PATIENT_FAILURE,
  payload: error
});

export const unverifyPatientSuccess = (patientId) => ({
  type: UNVERIFY_PATIENT_SUCCESS,
  payload: patientId
});

export const unverifyPatientFailure = (error) => ({
  type: UNVERIFY_PATIENT_FAILURE,
  payload: error
});

// Thunk action creators
export const fetchPatients = () => async (dispatch) => {
  dispatch(viewPatientsRequest());
  try {
    const response = await axios.get('http://localhost:5001/api/admin/patients');
    dispatch(viewPatientsSuccess(response.data));
  } catch (error) {
    dispatch(viewPatientsFailure(error.message));
  }
};

export const verifyPatient = (patientId) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:5001/api/admin/patients/verify/${patientId}`);
    dispatch(verifyPatientSuccess(patientId));
  } catch (error) {
    dispatch(verifyPatientFailure(error.message));
  }
};

export const unverifyPatient = (patientId) => async (dispatch) => {
  try {
    await axios.put(`http://localhost:5001/api/admin/patients/unverify/${patientId}`);
    dispatch(unverifyPatientSuccess(patientId));
  } catch (error) {
    dispatch(unverifyPatientFailure(error.message));
  }
};
