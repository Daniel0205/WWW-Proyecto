const initialState = {
  credentials: []
};

function loginReducer(state = initialState, action) {
  if (action.type === "SET_CREDENTIALS") {
    return Object.assign({}, state, {
      credentials: state.credentials.concat(action.payload)
    });
  }
  return state;
}

export default loginReducer;
