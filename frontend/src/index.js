import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import Dashboard from "./App";
import Login from "./components/Login";
import AddUser from "./components/UserAdd";

const routing = (
  <div>
    <Router>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/addUser" component={AddUser} />
    </Router>
  </div>
);

ReactDOM.render(routing, document.getElementById("root"));
