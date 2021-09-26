import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { useFormContext } from 'react-hook-form';
import { Reminder } from '../../../../ts';
import Item from './Item';
import useReminder from '../../../../hooks/useReminder';

const ResultSearch: React.FC = () => {
  const { listReminder } = useReminder();

  const { watch, setValue } = useFormContext();
  const remindersId = watch('remindersId');

  const selectAll = () => {
    const values = remindersId.length ? [] : listReminder.map((item: Reminder) => Number(item.id));
    setValue('remindersId', values);
  };

  return (
    <>
      <h4>Result Search</h4>
      <div className="d-flex justify-content-end">
        <Button color="link p-0 btn-link-delete mr-3" type="button" onClick={selectAll}>
          Select All
        </Button>

        <Button color="link p-0 btn-link-delete" type="submit" disabled={remindersId.length ? false : true}>
          Delete selected items{!!remindersId.length && ` (${remindersId.length})`}
        </Button>
      </div>
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
            <p className="mb-0">You don&apos;t have any reminders</p>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ResultSearch;
