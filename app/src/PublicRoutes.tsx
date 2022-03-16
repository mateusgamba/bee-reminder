import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import useAuth from './hooks/useAuth';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PublicTemplate from './components/PublicTemplate';

export default function PublicRoutes(): JSX.Element {
  const { authenticated } = useAuth();

  return authenticated ? (
    <Admin />
  ) : (
    <PublicTemplate>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<SignUp />} path="/sign-up" />
      </Routes>
    </PublicTemplate>
  );
}
