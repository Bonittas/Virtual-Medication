// reducers/postReducer.js

const initialState = {
    posts: [],
  };
  
  const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case "CREATE_POST":
        return {
          ...state,
          posts: [...state.posts, action.payload],
        };
        case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    
      case "UPDATE_POST":
        return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          ),
        };
      case "DELETE_POST":
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== action.payload),
        };
      default:
        return state;
    };
    

  }
  
  export default postReducer;
  