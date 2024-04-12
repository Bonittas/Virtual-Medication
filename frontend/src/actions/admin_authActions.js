// admin_authActions.js


import axios from 'axios';

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/auth/admin/signin", { email, password });
      dispatch({ type: 'SIGN_IN', payload: response.data });
    } catch (error) {
      console.error('Error during signin:', error);
      if (error.response && error.response.status === 400) {
        dispatch({ type: 'LOGIN_ERROR', payload: 'Login error' }); // Dispatch login error action
      } else {
        dispatch({ type: 'SIGN_IN_ERROR', payload: error.message }); 
      }
    }
  };
};

  

export const signUp = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/auth/patient/signup", { name, email, password });
      console.log('Response from server:', response); // Add this line for debugging
      
      if (response.status === 200) {
        dispatch({ type: 'SIGN_UP', payload: response.data });
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error during signup:', error);

      let errorMessage = 'An error occurred. Please try again later.';

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      dispatch({ type: 'SIGN_UP_ERROR', payload: errorMessage });
    }
  };
};
