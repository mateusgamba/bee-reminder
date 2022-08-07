import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import useAuth from './hooks/useAuth';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PublicTemplate from './components/PublicTemplate';
import NotFoundPage from './pages/NotFoundPage';
import Admin from './pages/Admin';

export default function Routing(): JSX.Element {
  const { authenticated } = useAuth();

  return authenticated ? (
    <Admin />
  ) : (
    <Routes>
      <Route path="/" element={<PublicTemplate />}>
        <Route element={<Home />} index />
        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<SignUp />} path="/sign-up" />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
