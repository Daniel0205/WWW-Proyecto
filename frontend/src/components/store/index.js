import { createStore, combineReducers, compose } from "redux";
import loginReducer from "./login/reducer";
import itemReducer from "./selectedItem/reducer";
import userReducer from "./selectedUser/reducer";
import modalReducer from "./selectedModal/reducer";

const reducers = combineReducers({
  loginReducer,
  itemReducer,
  userReducer,
  modalReducer,
});

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers, enhancers);

export default store;
