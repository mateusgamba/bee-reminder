import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Initial from './Content/Initial';
import ResultSearch from './Content/ResultSearch';
import useReminder from '../../hooks/useReminder';
import Header from './Header';
import Filters from './Filters';
import './style.css';

const COMPONENTS = { Initial, ResultSearch };

const Reminders: React.FC = () => {
  const history = useHistory();

  const { userId, fetchListReminder } = useReminder();

  if (!userId) {
    history.push('/');
  }

  const location = useLocation();

  const ListReminderComponent = COMPONENTS[location.search ? 'ResultSearch' : 'Initial'];

  useEffect(() => {
    if (location.search) {
      const parseDate = queryString.parse(location.search);
      const date = JSON.parse(JSON.stringify(parseDate));

      userId &&
        fetchListReminder({
          filter: {
            date: {
              ...(date.from && { from: date.from }),
              ...(date.to && { to: date.to }),
            },
            user_id: userId,
          },
        });
    }
  }, [location]);

  return (
    <>
      <div className="page-reminder-background"></div>
      <Container className="position-relative page-reminder">
        <Header />
        <main>
          <Filters />
          <ListReminderComponent />
        </main>
      </Container>
    </>
  );
};

export default Reminders;
