import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import { useFormContext } from 'react-hook-form';
import { parseISO, format } from 'date-fns';
import { Reminder } from '../../../ts';
import useReminder from '../../../hooks/useReminder';
import { ReactComponent as IconTrash } from '../../../assets/icons/trash.svg';

interface Props {
  reminder: Reminder;
  showDate?: boolean;
}

export default function Item({ reminder, showDate }: Props): JSX.Element {
  const { deleteReminder, deleteReminderLoading } = useReminder();

  const { getValues, setValue } = useFormContext();

  const remove = () => {
    deleteReminder({
      variables: { id: [Number(reminder.id)] },
    });
  };

  const handleReminderCheckbox = (item: Reminder) => {
    const listValues = getValues('remindersId');
    const index = listValues.indexOf(Number(item.id));
    let values = [];
    if (index !== -1) {
      listValues.splice(index, 1);
      values = listValues;
    } else {
      values = [...listValues, Number(item.id)];
    }
    setValue('remindersId', values);
  };

  return (
    <Row className="mt-3 border rounded p-3 bg-light no-gutters">
      <Col xs="12" sm="10" className="d-flex align-items-center">
        <div className="d-flex flex-column flex-sm-row justify-content-start">
          {showDate && (
            <div>
              <div className="badge badge-primary badge-bee text-wrap mr-3 mb-2 mb-sm-0">
                {format(parseISO(reminder.date), 'PPP')}
              </div>
            </div>
          )}
          <p className="mb-0">{reminder.description}</p>
        </div>
      </Col>
      <Col xs="12" sm="2" className="d-flex align-items-center justify-content-end mt-3 mt-sm-0">
        <Button type="button" size="sm" onClick={remove} disabled={deleteReminderLoading}>
          <IconTrash />
        </Button>
        <input
          type="checkbox"
          name="item"
          className="item-checkbox ml-3"
          onChange={() => handleReminderCheckbox(reminder)}
          checked={getValues('remindersId').includes(Number(reminder.id))}
        />
      </Col>
    </Row>
  );
}
