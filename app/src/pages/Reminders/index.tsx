import React, { useMemo } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { Reminder } from '../../ts';
import Item from './Item';
import useReminder from '../../hooks/useReminder';
import Header from './Header';
import './style.css';

const Reminders: React.FC = () => {
  const history = useHistory();

  const { listReminder, userId } = useReminder();

  if (!userId) {
    history.push('/');
  }

  const todayList = useMemo(
    () => listReminder.filter((item: Reminder) => moment(item.date).format('YYYY-M-D') === moment().format('YYYY-M-D')),
    [listReminder],
  );

  const nextDaysList = useMemo(
    () => listReminder.filter((item: Reminder) => moment(item.date).isAfter(moment())),
    [listReminder],
  );

  return (
    <>
      <div className="page-reminder-background"></div>
      <Container className="position-relative page-reminder">
        <Header />
        <main>
          <h4>Today</h4>
          {todayList.length > 0 ? (
            <>
              {todayList.map((reminder: Reminder) => (
                <Item reminder={reminder} key={reminder.id} />
              ))}
              <p className="mb-0 mt-2 ml-1">Total: {todayList.length}</p>
            </>
          ) : (
            <Row className="mt-3 border rounded p-3 bg-light no-gutters">
              <Col xs="12" className="d-flex align-items-center">
                <p className="mb-0">You don&apos;t have any reminders today</p>
              </Col>
            </Row>
          )}

          <h4 className="mt-4">Next Days</h4>
          {nextDaysList.length > 0 ? (
            <>
              {nextDaysList.map((reminder: Reminder) => (
                <Item reminder={reminder} key={reminder.id} showDate />
              ))}
              <p className="mb-0 mt-2 ml-1">Total: {nextDaysList.length}</p>
            </>
          ) : (
            <Row className="mt-3 border rounded p-3 bg-light no-gutters">
              <Col xs="12" className="d-flex align-items-center">
                <p className="mb-0">You don&apos;t have any reminders for the next few days</p>
              </Col>
            </Row>
          )}
        </main>
      </Container>
    </>
  );
};

export default Reminders;
