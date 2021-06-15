import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import moment from 'moment';
import { useMutation } from '@apollo/client';
import { Reminder } from '../../ts';
import useReminder from '../../hooks/useReminder';
import { toast } from 'react-toastify';
import { DELETE_REMINDER_GQL } from '../../graphql/Reminders';
import { ReactComponent as IconTrash } from '../../assets/icons/trash.svg';

interface Props {
  reminder: Reminder;
  showDate?: boolean;
}

const Item: React.FC<Props> = ({ reminder, showDate }) => {
  const { fetchListReminder } = useReminder();

  const [deleteReminder, { loading }] = useMutation(DELETE_REMINDER_GQL, {
    onCompleted: () => [toast.success('Successfully deleted'), fetchListReminder()],
    onError: () => toast.error('An error has occurred.'),
  });

  const remove = () => {
    deleteReminder({
      variables: {
        id: reminder.id,
      },
    });
  };

  return (
    <Row className="mt-3 border rounded p-3 bg-light no-gutters">
      <Col xs="10" className="d-flex align-items-center">
        {showDate && (
          <div className="badge badge-primary badge-bee text-wrap mr-3">
            {moment(reminder.date).format('MMMM Do YYYY')}
          </div>
        )}

        <p className="mb-0">{reminder.description}</p>
      </Col>
      <Col xs="2" className="text-right">
        <Button type="button" size="sm" onClick={remove} disabled={loading}>
          <IconTrash />
        </Button>
      </Col>
    </Row>
  );
};

export default Item;
