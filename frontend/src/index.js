import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./components/store/";
import Dashboard from "./App";
import Login from "./components/Login";
import Client from "./components/Client";


const routing = (
  <Provider store={store}>
    <div>
      <Router>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/client" component={Client} />
      </Router>
    </div>
  </Provider>
);

ReactDOM.render(routing, document.getElementById("root"));
