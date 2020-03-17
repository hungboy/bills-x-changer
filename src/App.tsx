import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, AirQuality } from './modules';
import { ToastNotificationProvider } from './modules/common/ToastNotification';
const App = () => (
  <BrowserRouter>
    <ToastNotificationProvider placement="bottom-center">
      <Switch>
        <Route path="/air-quality" component={AirQuality.AirQuality} />
        <Route path="/*" component={Home.Home} />
      </Switch>
    </ToastNotificationProvider>
  </BrowserRouter>
);

export default App;
