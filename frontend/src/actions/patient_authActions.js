import axios from 'axios';

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/auth/patient/signin", { email, password });
      dispatch({ type: 'SIGN_IN', payload: response.data });
    } catch (error) {
      console.error('Error during signin:', error);
      dispatch({ type: 'SIGN_IN_ERROR', payload: error.message }); 
    }
  };
};

export const signUp = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/auth/patient/signup", { name, email, password });
      dispatch({ type: 'SIGN_UP', payload: response.data }); 
    } catch (error) {
      console.error('Error during signup:', error); 
      dispatch({ type: 'SIGN_UP_ERROR', payload: error.message }); 
    }
  };
};
