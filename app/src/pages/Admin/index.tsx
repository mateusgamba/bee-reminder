import React from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import Reminders from './Reminders';
import Profile from './Profile';
import useAuth from '../../hooks/useAuth';

const GuardRoute = (props: RouteProps) => {
  const { authenticated } = useAuth();
  if (!authenticated) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};
export default function Admin(): JSX.Element {
  return (
    <Switch>
      <GuardRoute component={Reminders} path="/" exact />
      <GuardRoute component={Profile} path="/profile" exact />
      <GuardRoute component={() => <Redirect to="/" />} />
    </Switch>
  );
}
