import React, { useMemo } from 'react';
import { Row, Col, Button, Form } from 'reactstrap';
import { useForm, FormProvider } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { Reminder, ReminderDeleteInput } from '../../../ts';
import useReminder from '../../../hooks/useReminder';
import useQueryString from '../../../hooks/useQueryString';
import { LIST_REMINDER_GQL } from '../../../graphql/Reminders';
import Item from '../Reminders/Item';

export default function RemindersSearch(): JSX.Element {
  const { deleteReminder } = useReminder();
  const query = useQueryString();

  const from = query.get('from') === '' ? undefined : query.get('from');
  const to = query.get('to') === '' ? undefined : query.get('to');

  const { data: dataListReminder } = useQuery<{
    reminders: { data: Reminder[] };
  }>(LIST_REMINDER_GQL, {
    fetchPolicy: 'no-cache',
    variables: {
      filter: { date: { from, to } },
    },
  });

  const listReminder = useMemo(() => {
    return dataListReminder?.reminders.data ?? [];
  }, [dataListReminder]);

  const methods = useForm<ReminderDeleteInput>({
    defaultValues: {
      remindersId: [],
    },
  });

  const { watch, setValue, handleSubmit, reset } = methods;
  const remindersId = watch('remindersId');

  const onSubmit = handleSubmit((variables) => {
    deleteReminder({
      variables: { id: variables.remindersId },
    });
    reset();
  });

  const selectAll = () => {
    const values = remindersId.length ? [] : listReminder.map((item: Reminder) => Number(item.id));
    setValue('remindersId', values);
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit} noValidate>
        <h4>Result Search</h4>
        <div className="d-flex justify-content-end">
          <Button color="link p-0 btn-link-delete me-3" type="button" onClick={selectAll}>
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
            <p className="mb-0 mt-2 ms-1">Total: {listReminder.length}</p>
          </>
        ) : (
          <Row className="mt-3 border rounded p-3 bg-light g-0">
            <Col xs="12" className="d-flex align-items-center">
              <p className="mb-0">You don&apos;t have any reminders</p>
            </Col>
          </Row>
        )}
      </Form>
    </FormProvider>
  );
}
