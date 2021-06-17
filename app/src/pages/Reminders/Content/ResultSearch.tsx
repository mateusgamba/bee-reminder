import React from 'react';
import { Row, Col } from 'reactstrap';
import { Reminder } from '../../../ts';
import Item from './Item';
import useReminder from '../../../hooks/useReminder';

const ResultSearch: React.FC = () => {
  const { listReminder } = useReminder();

  return (
    <>
      <h4>Result Search</h4>
      {listReminder.length > 0 ? (
        <>
          {listReminder.map((reminder: Reminder) => (
            <Item reminder={reminder} key={reminder.id} showDate />
          ))}
          <p className="mb-0 mt-2 ml-1">Total: {listReminder.length}</p>
        </>
      ) : (
        <Row className="mt-3 border rounded p-3 bg-light no-gutters">
          <Col xs="12" className="d-flex align-items-center">
            <p className="mb-0">You don&apos;t have any reminders for the next few days</p>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ResultSearch;
