const initialState = {
  Customer_id: null, // for store the id of  selected customer
};

function customerReducer(state = initialState, action) {
  if (action.type === "SET_SELECTED_CUSTOMER") {
    return { Customer_id: action.payload };
  }
  return state;
}

export default customerReducer;
