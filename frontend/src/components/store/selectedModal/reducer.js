//Initial state of all Modals
const modals = {
  Customers: false,
  Another: false, //free for a new Modal
};

function modalReducer(state = modals, action) {
  if (action.type === "SET_MODAL_CUSTOMER") {
    return { Customers: action.payload, Another: modals.Another };
  }
  if (action.type === "SET_MODAL_ANOTHER") {
    return { Customers: modals.Customers , Another: action.payload };
  }
  return state;
}

export default modalReducer;
