import {
    FETCH_USER_DATA_REQUEST,
    FETCH_USER_DATA_SUCCESS,
    FETCH_USER_DATA_FAILURE,
  } from '../actions/actionTypes';
  
  const initialState = {
    userData: {
      name: '', // Set default values for user data properties
      email: '',
      // Add other properties here with their default values
    },
    isLoading: false,
    error: null,
  };
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_DATA_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case FETCH_USER_DATA_SUCCESS:
        return {
          ...state,
          userData: action.payload,
          isLoading: false,
          error: null,
        };
      case FETCH_USER_DATA_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  