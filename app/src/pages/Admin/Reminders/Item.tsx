import { Button, Row, Col } from 'reactstrap';
import { useFormContext } from 'react-hook-form';
import { format, parseISO } from 'date-fns';
import classNames from 'classnames';
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
    <Row className="mt-3 border rounded p-3 bg-light g-0">
      <Col xs="auto" className="d-flex align-items-center me-3 order-1">
        <input
          type="checkbox"
          name="item"
          className="item-checkbox ml-3"
          onChange={() => handleReminderCheckbox(reminder)}
          checked={getValues('remindersId').includes(Number(reminder.id))}
        />
      </Col>
      {showDate && (
        <Col xs="8" md="3" lg="auto" className="d-flex align-items-center order-1 me-lg-3">
          <p className="mb-0 fst-italic text-secondary">{format(parseISO(reminder.date), 'PPP')}</p>
        </Col>
      )}
      <Col
        xs={showDate ? '12' : '8'}
        md="7"
        lg="8"
        className={classNames('d-flex align-items-center flex-fill', {
          'order-3 order-md-2 pt-3 pt-md-0': showDate,
          'order-2': !showDate,
        })}
      >
        <p className="mb-0">{reminder.description}</p>
      </Col>
      <Col
        xs="2"
        md="1"
        className={classNames('d-flex align-items-center justify-content-end flex-grow-1 flex-md-grow-0', {
          'order-2 order-md-3': showDate,
          'order-3': !showDate,
        })}
      >
        <Button type="button" size="sm" onClick={remove} disabled={deleteReminderLoading}>
          <IconTrash />
        </Button>
      </Col>
    </Row>
  );
}
