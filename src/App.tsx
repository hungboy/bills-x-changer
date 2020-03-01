import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { RouteHeader } from "./modules/common";
import { Home } from "./modules";

const ROUTES = [{ label: "Home", path: "/home" }];

const App = () => (
  <BrowserRouter>
    <Route
      path="*"
      render={props => <RouteHeader {...{ ...props, routes: ROUTES }} />}
    />
    <Switch>
      <Route path="/*" component={Home.Home} />
    </Switch>
  </BrowserRouter>
);

export default App;
