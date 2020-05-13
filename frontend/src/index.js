import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/store/";
import App from "./App";
import Dashboard from "./components/Dashboard/Paperbase";
import Login from "./components/Login";
import { Redirect } from "react-router-dom";

const routing = (
  <Provider store={store}>
    <div>
      <Router>
        <Redirect from="/dashboard" to="/home" />
        <Route exact path="/home" component={App} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
      </Router>
    </div>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));
