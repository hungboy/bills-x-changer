import React from 'react';
import {
  Route,
  Switch,
  RouteComponentProps,
  withRouter
} from 'react-router-dom';
import { ToastNotificationsExample } from './modules';

export interface IExamplesProps extends RouteComponentProps {}
const Examples = ({ location, match }: IExamplesProps) => {
  return (
    <Switch>
      <Route
        path={`${match.path}/toast-notifications`}
        component={ToastNotificationsExample}
      />
    </Switch>
  );
};

export const ExamplesRouter = withRouter(Examples);
