import axios from 'axios'; // Import axios

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/doctor/signin", { email, password });
      dispatch({ type: 'SIGN_IN', payload: response.data });
    } catch (error) {
      console.error('Error during signin:', error);
      dispatch({ type: 'SIGN_IN_ERROR', payload: error.message }); 
      throw error; // Re-throw the error for the component to handle
    }
  };
};

export const signUp = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/doctor/signup", { name, email, password });
      dispatch({ type: 'SIGN_UP', payload: response.data }); 
    } catch (error) {
      console.error('Error during signup:', error); 
      dispatch({ type: 'SIGN_UP_ERROR', payload: error.message }); 
    }
  };
};