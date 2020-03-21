const initialState = {
  item: "SignIn" //Component to be displayed first on the home page
};

function itemReducer(state = initialState, action) {
  if (action.type === "SET_SELECTED_ITEM") {
    return { item: action.payload };
  }
  return state;
}

export default itemReducer;
