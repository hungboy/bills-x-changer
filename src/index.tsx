import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { RoutedApp as App } from "./App";
import { Provider } from "react-redux";
import { store } from "./ducks/store";
import * as serviceWorker from "./serviceWorker";

const ConnectedApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(ConnectedApp, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
