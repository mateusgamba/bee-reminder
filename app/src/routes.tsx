import React from 'react';
import { Route, BrowserRouter, Switch, Redirect, RouteProps } from 'react-router-dom';
import Home from './pages/Home';
import Reminders from './pages/Reminders';
import Profile from './pages/Profile';
import useAuth from './hooks/useAuth';
import SignIn from './pages/SignIn';
import NavBarPrimary from './components/_Organisms/NavBarPrimary';
import PublicTemplate from './components/PublicTemplate';

const GuardRoute = (props: RouteProps) => {
  const { validated } = useAuth();
  console.log('validated', validated);
  if (!validated) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

const Routes: React.FC = () => {
  const { validated } = useAuth();

  return (
    <BrowserRouter>
      {!validated ? (
        <PublicTemplate>
          <Switch>
            <Route component={Home} path="/" exact />
            <Route component={SignIn} path="/sign-in" exact />
            <GuardRoute component={() => <Redirect to="/" />} />
          </Switch>
        </PublicTemplate>
      ) : (
        <>
          <NavBarPrimary />
          <Switch>
            <GuardRoute component={Reminders} path="/" exact />
            <GuardRoute component={Profile} path="/profile" exact />
            <GuardRoute component={() => <Redirect to="/profile" />} />
          </Switch>
        </>
      )}
    </BrowserRouter>
  );
};

export default Routes;
