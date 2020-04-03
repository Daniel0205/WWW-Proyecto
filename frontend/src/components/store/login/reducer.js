const initialState = {
  credentials: {'id_user:':'','type':'','name':'','token':''}
};

function loginReducer(state = initialState, action) {
  if (action.type === "SET_CREDENTIALS") {
    return Object.assign({}, state, {
      credentials: action.payload
    });
  }
  return state;
}

export default loginReducer;
