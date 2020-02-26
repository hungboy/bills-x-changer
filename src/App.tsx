import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { RouteHeader } from "./modules/common";
import { Home } from "./modules";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const ROUTES = [{ label: "Home", path: "/home" }];

export const RoutedApp = () => (
  <BrowserRouter>
    <Route
      path="*"
      render={props => <RouteHeader {...{ ...props, routes: ROUTES }} />}
    />
    <Switch>
      <Route path="/home" component={Home.Home} />
      <Route path="*">
        <App />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
