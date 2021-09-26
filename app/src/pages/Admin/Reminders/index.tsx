import React, { useEffect } from 'react';
import { Container, Form } from 'reactstrap';
import { useForm, FormProvider } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Initial from './Content/Initial';
import ResultSearch from './Content/ResultSearch';
import useReminder from '../../../hooks/useReminder';
import Header from './Header';
import Filters from './Filters';
import { ReminderDeleteInput } from '../../../ts';
import './style.css';

const COMPONENTS = { Initial, ResultSearch };

const Reminders: React.FC = () => {
  const { userId, fetchListReminder, deleteReminder, listReminder } = useReminder();

  const methods = useForm<ReminderDeleteInput>({
    defaultValues: {
      remindersId: [],
    },
  });

  const { handleSubmit, setValue } = methods;

  const onSubmit = handleSubmit((variables) => {
    deleteReminder({
      variables: { id: variables.remindersId },
    });
  });

  const location = useLocation();

  const ListReminderComponent = COMPONENTS[location.search ? 'ResultSearch' : 'Initial'];

  useEffect(() => {
    const parseDate = queryString.parse(location.search);
    const date = JSON.parse(JSON.stringify(parseDate));
    setValue('remindersId', []);
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
  }, [location.search]);

  useEffect(() => setValue('remindersId', []), [listReminder]);

  return (
    <>
      <div className="page-reminder-background"></div>
      <Container className="position-relative page-reminder">
        <Header />
        <main>
          <Filters />
          <FormProvider {...methods}>
            <Form onSubmit={onSubmit} noValidate>
              <ListReminderComponent />
            </Form>
          </FormProvider>
        </main>
      </Container>
    </>
  );
};

export default Reminders;
