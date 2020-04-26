const initialState = {
    user: '' //Component to be displayed first on the home page
  };
  
  function userReducer(state = initialState, action) {
    if (action.type === "SET_SELECTED_USER") {
      return { user: action.payload };
    }
    return state;
  }
  
  export default userReducer;
  