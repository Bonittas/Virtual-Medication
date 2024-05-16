// reducers/appointmentReducer.js

const initialState = {
    appointments: [],
    loading: false,
    error: null,
  };
  
  const appointmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_APPOINTMENTS_SUCCESS':
        return {
          ...state,
          loading: false,
          appointments: action.payload,
          error: null,
        };
      case 'FETCH_APPOINTMENTS_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default appointmentReducer;
  