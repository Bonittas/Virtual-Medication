import axios from 'axios'; // Import axios

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/admin/signin", { email, password });
      dispatch({ type: 'SIGN_IN', payload: response.data });
    } catch (error) {
      console.error('Error during signin:', error);
      dispatch({ type: 'SIGN_IN_ERROR', payload: error.message }); 
      throw error; // Re-throw the error for the component to handle
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:5000/api/auth/admin/signout");
      dispatch({ type: 'LOGOUT' }); // Dispatch action to clear user state
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error if needed
    }
  };
};

export const signUp = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/admin/signup", { name, email, password });
      dispatch({ type: 'SIGN_UP', payload: response.data });
    } catch (error) {
      console.error('Error during signup:', error);
      console.error('Error details:', error.response.data); // Log the error details
      dispatch({ type: 'SIGN_UP_ERROR', payload: error.message });
      throw error;
    }
  };
};