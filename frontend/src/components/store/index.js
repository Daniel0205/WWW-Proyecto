import { createStore, combineReducers, compose } from "redux";
import loginReducer from "./login/reducer";
import itemReducer from "./selectedItem/reducer";
import userReducer from "./selectedUser/reducer";

const reducers = combineReducers({
  loginReducer,
  itemReducer,
  userReducer
  
});

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers, enhancers);

export default store;
