const initialState = {
  user: null,
  error: null,
  userData: null,
  userProfile: null,
  notifications: [],
  appointments: [], 
  verifiedDoctors: [], // Add verified doctors state
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
    case 'SIGN_UP':
    case 'COMPLETE_DETAILS':
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        error: null
      };
    case 'SIGN_IN_ERROR':
    case 'SIGN_UP_ERROR':
    case 'DETAILS_ERROR':
    case 'UPDATE_USER_ERROR':
    case 'FETCH_USER_DATA_ERROR':
      return {
        ...state,
        user: null,
        error: action.payload
      };
    case 'FETCH_USER_DATA_SUCCESS':
    case 'FETCH_USER_PROFILE_SUCCESS':
      return {
        ...state,
        userData: action.payload,
        error: null
      };
    case 'FETCH_NOTIFICATIONS_SUCCESS':
      return {
        ...state,
        notifications: action.payload,
        error: null
      };
    case 'FETCH_NOTIFICATIONS_ERROR':
      return {
        ...state,
        notifications: [],
        error: action.payload
      };
    case 'FETCH_APPOINTMENTS_SUCCESS': 
      return {
        ...state,
        appointments: action.payload,
        error: null
      };
    case 'FETCH_APPOINTMENTS_ERROR': 
      return {
        ...state,
        appointments: [],
        error: action.payload
      };
    case 'FETCH_VERIFIED_DOCTORS_SUCCESS': // Action type for fetching verified doctors
      return {
        ...state,
        verifiedDoctors: action.payload,
        error: null
      };
    case 'FETCH_VERIFIED_DOCTORS_ERROR': 
      return {
        ...state,
        verifiedDoctors: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
