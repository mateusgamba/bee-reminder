import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import useReminder from '../../../hooks/useReminder';
import { Form } from 'reactstrap';
import { useForm, FormProvider } from 'react-hook-form';
import { Reminder, ReminderDeleteInput } from '../../../ts';
import Item from './Item';

interface Props {
  reminders: Reminder[];
  title: string;
  showDate?: boolean;
}

export default function List({ reminders, title, showDate }: Props): JSX.Element {
  const { deleteReminder } = useReminder();

  const methods = useForm<ReminderDeleteInput>({
    defaultValues: {
      remindersId: [],
    },
  });

  const { handleSubmit, watch, setValue, reset } = methods;
  const remindersId = watch('remindersId');

  const onSubmit = handleSubmit((variables) => {
    deleteReminder({
      variables: { id: variables.remindersId },
    });
    reset();
  });

  const selectAll = () => {
    const values = remindersId.length ? [] : reminders.map((item: Reminder) => Number(item.id));
    setValue('remindersId', values);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit} noValidate>
        <h4 className="mb-3">{title}</h4>

        {reminders.length > 0 ? (
          <>
            <div className="d-flex justify-content-start mb-3">
              <Button color="link p-0 btn-link-delete me-3" type="button" onClick={selectAll}>
                Select All
              </Button>
              <Button color="link p-0 btn-link-delete" type="submit" disabled={remindersId.length ? false : true}>
                Delete selected items{!!remindersId.length && ` (${remindersId.length})`}
              </Button>
            </div>

            {reminders.map((reminder: Reminder) => (
              <Item reminder={reminder} key={reminder.id} showDate={showDate} />
            ))}
            <p className="mb-0 mt-2 ml-1">Total: {reminders.length}</p>
          </>
        ) : (
          <Row className="border rounded p-3 bg-light g-0">
            <Col xs="12" className="d-flex align-items-center">
              <p className="mb-0">You don&apos;t have any reminders today</p>
            </Col>
          </Row>
        )}
      </Form>
    </FormProvider>
  );
}
