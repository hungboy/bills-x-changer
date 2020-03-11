import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, AirQuality } from './modules';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/air-quality" component={AirQuality.AirQuality} />
      <Route path="/*" component={Home.Home} />
    </Switch>
  </BrowserRouter>
);

export default App;
