import React from 'react';
import { Route, Switch, Redirect, RouteProps } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from './Reminders/Header';
import Reminders from './Reminders';
import RemindersSearch from './RemindersSearch';
import useAuth from '../../hooks/useAuth';
import HeaderFilters from '../../components/HeaderFilters';
import { UserProvider } from '../../hooks/useUser';
import { UseReminderProvider } from '../../hooks/useReminder';

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
      <RouteProtected component={RemindersSearch} path="/search" exact />
      <RouteProtected component={() => <Redirect to="/" />} />
    </Switch>
  );
}

export default function Admin(): JSX.Element {
  return (
    <UserProvider>
      <UseReminderProvider>
        <div className="page-reminder-background" />
        <Container className="position-relative page-reminder">
          <Header />
          <main>
            <HeaderFilters />
            <AdminContent />
          </main>
        </Container>
      </UseReminderProvider>
    </UserProvider>
  );
}
