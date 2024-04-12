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
        return {
          ...state,
          user: null,
          error: action.payload
        };
      case 'SIGN_UP':
        return {
          ...state,
          user: action.payload,
          error: null
        };
      case 'SIGN_UP_ERROR':
        return {
          ...state,
          user: null,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  