import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import useAuth from './hooks/useAuth';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PublicTemplate from './components/PublicTemplate';

const Routes: React.FC = () => {
  const { authenticated } = useAuth();

  return authenticated ? (
    <Admin />
  ) : (
    <PublicTemplate>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={SignIn} path="/sign-in" exact />
        <Route component={SignUp} path="/sign-up" exact />
      </Switch>
    </PublicTemplate>
  );
};

export default Routes;
