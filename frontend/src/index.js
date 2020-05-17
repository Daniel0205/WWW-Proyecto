import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/store/";
import Dashboard from "./components/Dashboard/Paperbase";
import Login from "./components/Login";
import Client from "./components/Client";
import App from "./App"
import { Redirect } from "react-router-dom";

const routing = (
  <Provider store={store}>
    <div>
      <Router>
        <Redirect from="/dashboard" to="/home" />
        <Route exact path="/home" component={App} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/client" component={Client} />
      </Router>
    </div>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));
