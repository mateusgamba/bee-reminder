import React from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import Reminders from './Reminders';
import Profile from './Profile';
import useAuth from '../../hooks/useAuth';
import { UserProvider } from '../../hooks/useUser';

const RouteProtected = (props: RouteProps) => {
  const { authenticated } = useAuth();
  if (!authenticated) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

function AdminContent(): JSX.Element {
  return (
    <Switch>
      <RouteProtected component={Reminders} path="/" exact />
      <RouteProtected component={Profile} path="/profile" exact />
      <RouteProtected component={() => <Redirect to="/" />} />
    </Switch>
  );
}

export default function Admin(): JSX.Element {
  return (
    <UserProvider>
      <AdminContent />
    </UserProvider>
  );
}
