import axios from 'axios';

// Redux action for sign up
export const signUp = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/doctor/signup", { name, email, password });
      dispatch({ type: 'SIGN_UP', payload: response.data });
      // Store user ID or session token in local storage
      localStorage.setItem('userId', response.data.user._id);
    } catch (error) {
      console.error('Error during signup:', error); 
      dispatch({ type: 'SIGN_UP_ERROR', payload: error.message }); 
    }
  };
};

// Redux action for sign in
export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/doctor/signin", { email, password });
      dispatch({ type: 'SIGN_IN', payload: response.data });
      // Store user ID or session token in local storage
      localStorage.setItem('userId', response.data.user._id);
    } catch (error) {
      console.error('Error during signin:', error);
      dispatch({ type: 'SIGN_IN_ERROR', payload: error.message }); 
      throw error; // Re-throw the error for the component to handle
    }
  };
};

export const completeProfile = (profileData) => {
  return async (dispatch) => {
    const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/doctor/complete-profile/${userId}`, profileData);
      dispatch({ type: 'COMPLETE_PROFILE', payload: response.data });
    } catch (error) {
      console.error('Error completing profile:', error);
      throw error;
    }
  };
};

