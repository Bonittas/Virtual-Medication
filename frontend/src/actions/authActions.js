// src/actions/authActions.js
import axios from 'axios';

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/auth/patient/signin", { email, password });
      dispatch({ type: 'SIGN_IN', payload: response.data });
    } catch (error) {
      dispatch({ type: 'SIGN_IN_ERROR', payload: error.message }); 
    }
  };
};

export const signUp = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/auth/patient/signup", { name, email, password });
      dispatch({ type: 'SIGN_UP', payload: response.data }); // Dispatch action upon successful sign-up
    } catch (error) {
      dispatch({ type: 'SIGN_UP_ERROR', payload: error.message }); // Dispatch action if sign-up fails
    }
  };
};
