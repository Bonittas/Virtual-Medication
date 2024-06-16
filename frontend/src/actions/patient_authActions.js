import axios from 'axios'; // Import axios
import {  FETCH_VERIFIED_DOCTORS_REQUEST,
  FETCH_VERIFIED_DOCTORS_SUCCESS,
  FETCH_VERIFIED_DOCTORS_FAILURE,FETCH_PATIENT_DATA_FAILURE,FETCH_PATIENT_DATA_REQUEST,FETCH_PATIENT_DATA_SUCCESS,UPDATE_USER_DATA_SUCCESS, UPDATE_USER_DATA_ERROR } from './actionTypes';

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/patient/signin', { email, password });
      dispatch({ type: 'SIGN_IN_SUCCESS', payload: response.data });
      localStorage.setItem('token', response.data.token); // Ensure correct key used here
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch({ type: 'SIGN_IN_ERROR', payload: 'Invalid email or password. Please try again.' });
      } else {
        dispatch({ type: 'SIGN_IN_ERROR', payload: 'An error occurred during login. Please try again later.' });
      }
      throw error;
    }
  };
};

export const signUp = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/patient/signup", { name, email, password });

      dispatch({ type: 'SIGN_UP', payload: response.data });
      
      localStorage.setItem('userId', response.data.user._id);
    } catch (error) {
      console.error('Error during signup:', error); 
      dispatch({ type: 'SIGN_UP_ERROR', payload: error.message }); 
      throw error;
    }
  };
};
export const completeDetails = (formData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found in local storage');
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        }
      };

      const response = await axios.put("http://localhost:5000/api/auth/patient/details", formData, config);

      dispatch({ type: 'COMPLETE_DETAILS_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('Error completing details:', error); 
      dispatch({ type: 'DETAILS_ERROR', payload: error.message }); 
      throw error;
    }
  };
};

export const fetchPatientDataRequest = () => ({
  type: FETCH_PATIENT_DATA_REQUEST
});

export const fetchPatientDataSuccess = (patientData) => ({
  type: FETCH_PATIENT_DATA_SUCCESS,
  payload: patientData
});

export const fetchPatientDataFailure = (error) => ({
  type: FETCH_PATIENT_DATA_FAILURE,
  payload: error
});

export const fetchPatientData = () => {
  return async (dispatch) => {
    dispatch(fetchPatientDataRequest());
    try {
      const response = await axios.get("http://localhost:5000/api/auth/patient/currentUser", {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      dispatch(fetchPatientDataSuccess(response.data.patient));
    } catch (error) {
      console.error('Error fetching patient data:', error);
      dispatch(fetchPatientDataFailure('Error fetching patient data'));
    }
  };
};
export const updateUserData = (formData) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put("http://localhost:5000/api/auth/updatePatient", formData, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      });
      dispatch({ type: UPDATE_USER_DATA_SUCCESS, payload: response.data.user });
    } catch (error) {
      console.error('Error updating user data:', error);
      dispatch({ type: UPDATE_USER_DATA_ERROR, payload: error.message });
    }
  };
};
export const logout = (navigate) => { // Accept navigate function as argument
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:5000/api/auth/patient/signout");
      dispatch({ type: 'LOGOUT' }); // Dispatch action to clear user state
      navigate('/signin-option'); // Navigate to '/' after successful logout
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error if needed
    }
  };
};
export const fetchVerifiedDoctors = () => {
  return async (dispatch) => {
    dispatch(fetchVerifiedDoctorsRequest());

    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:5000/api/auth/doctors/verified',{
      headers: {
        'x-auth-token': token
      }
    })
      dispatch(fetchVerifiedDoctorsSuccess(response.data));
    } catch (error) {
      dispatch(fetchVerifiedDoctorsFailure(error.message));
    }
  };
};

// Action creator for fetch verified doctors request
export const fetchVerifiedDoctorsRequest = () => ({
  type: FETCH_VERIFIED_DOCTORS_REQUEST
});

// Action creator for fetch verified doctors success
export const fetchVerifiedDoctorsSuccess = (doctors) => ({
  type: FETCH_VERIFIED_DOCTORS_SUCCESS,
  payload: doctors
});

// Action creator for fetch verified doctors failure
export const fetchVerifiedDoctorsFailure = (error) => ({
  type: FETCH_VERIFIED_DOCTORS_FAILURE,
  payload: error
});
export const requestAppointment = (appointmentData) => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/api/auth/appointment/request', appointmentData, {
      headers: {
        'x-auth-token': token
      }
    })
      .then((response) => {
        // Handle success
        console.log("Appointment request sent successfully:", response.data);
        // Dispatch action if needed
      })
      .catch((error) => {
        // Handle error
        console.error("Error requesting appointment:", error);
        // Dispatch action if needed
      });
  };
};