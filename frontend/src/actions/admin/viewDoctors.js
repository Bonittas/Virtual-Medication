// actions/admin/viewDoctors.js

import axios from 'axios';
import {
  VIEW_DOCTORS_REQUEST,
  VIEW_DOCTORS_SUCCESS,
  VIEW_DOCTORS_FAILURE,
  VERIFY_DOCTOR_REQUEST,
  VERIFY_DOCTOR_SUCCESS,
  VERIFY_DOCTOR_FAILURE,
  UNVERIFY_DOCTOR_REQUEST,
  UNVERIFY_DOCTOR_SUCCESS,
  UNVERIFY_DOCTOR_FAILURE,
} from '../actionTypes';

// Action creators for viewing doctors
export const viewDoctorsRequest = () => ({
  type: VIEW_DOCTORS_REQUEST,
});

export const viewDoctorsSuccess = (doctors) => ({
  type: VIEW_DOCTORS_SUCCESS,
  payload: doctors,
});

export const viewDoctorsFailure = (error) => ({
  type: VIEW_DOCTORS_FAILURE,
  payload: error,
});

export const viewDoctors = () => {
  return async (dispatch) => {
    dispatch(viewDoctorsRequest());
    try {
      const response = await axios.get('http://localhost:5001/api/admin/doctors');
      dispatch(viewDoctorsSuccess(response.data.doctors));
    } catch (error) {
      dispatch(viewDoctorsFailure(error.message));
    }
  };
};

export const verifyDoctorSuccess = (doctorId) => ({
  type: VERIFY_DOCTOR_SUCCESS,
  payload: doctorId,
});

export const verifyDoctorFailure = (error) => ({
  type: VERIFY_DOCTOR_FAILURE,
  payload: error,
});

export const verifyDoctor = (doctorId) => {
  return async (dispatch) => {
    try {
      await axios.put(`http://localhost:5001/api/admin/doctors/verify/${doctorId}`);
      dispatch(verifyDoctorSuccess(doctorId));
      // You may want to dispatch the viewDoctors action again to refresh the doctor list
    } catch (error) {
      dispatch(verifyDoctorFailure(error.message));
    }
  };
};

// Action creators for unverifying a doctor
export const unverifyDoctorSuccess = (doctorId) => ({
  type: UNVERIFY_DOCTOR_SUCCESS,
  payload: doctorId,
});

export const unverifyDoctorFailure = (error) => ({
  type: UNVERIFY_DOCTOR_FAILURE,
  payload: error,
});

export const unverifyDoctor = (doctorId) => {
  return async (dispatch) => {
    try {
      await axios.put(`http://localhost:5001/api/admin/doctors/unverify/${doctorId}`);
      dispatch(unverifyDoctorSuccess(doctorId));
      // You may want to dispatch the viewDoctors action again to refresh the doctor list
    } catch (error) {
      dispatch(unverifyDoctorFailure(error.message));
    }
  };
};
