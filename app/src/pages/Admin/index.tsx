import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from './Reminders/Header';
import Reminders from './Reminders';
import RemindersSearch from './RemindersSearch';
import useAuth from '../../hooks/useAuth';
import HeaderFilters from '../../components/HeaderFilters';
import { UserProvider } from '../../hooks/useUser';
import { UseReminderProvider } from '../../hooks/useReminder';

/*
const RouteProtected = (props: RouteProps) => {
  const { authenticated } = useAuth();
  if (!authenticated) {
    return <Route element={() => <Navigate to="/" />} />;
  }
  return <Route {...props} />;
};
*/
/*
function AdminContent(): JSX.Element {
  return (
    <Routes>
      <RouteProtected path="/" element={<Reminders />} />
      <RouteProtected path="/search" element={<RemindersSearch />} />
      <RouteProtected element={() => <Navigate to="/" />} />
    </Routes>
  );
}
*/
export default function Admin(): JSX.Element {
  return (
    <UserProvider>
      <UseReminderProvider>
        <div className="page-reminder-background" />
        <Container className="position-relative page-reminder">
          <Header />
          <main>
            <HeaderFilters />
            <Routes>
              <Route
                element={
                  <RequireAuth>
                    <Reminders />
                  </RequireAuth>
                }
                path="/"
              />
              <Route
                element={
                  <RequireAuth>
                    <RemindersSearch />
                  </RequireAuth>
                }
                path="/search"
              />
              <Route element={() => <Navigate to="/" />} />
            </Routes>
          </main>
        </Container>
      </UseReminderProvider>
    </UserProvider>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const { authenticated } = useAuth();
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
