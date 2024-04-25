const initialState = {
  user: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: action.payload,
        error: null
      };
    case 'SIGN_IN_ERROR':
    case 'SIGN_UP_ERROR':
      return {
        ...state,
        user: null,
        error: action.payload
      };
    case 'SIGN_UP':
      return {
        ...state,
        user: action.payload.user,
        error: null
      };
    case 'COMPLETE_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          profileCompleted: true // Optionally update user data to reflect profile completion status
        },
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;
