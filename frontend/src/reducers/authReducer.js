// authReducer.js
const initialState = {
  user: null,
  error: null,
  userData: null
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
      return {
        ...state,
        userData: action.payload,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;
