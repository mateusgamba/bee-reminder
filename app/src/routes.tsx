import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Reminders from './pages/Reminders';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={Reminders} path="/reminders" exact />
    </BrowserRouter>
  );
};

export default Routes;
