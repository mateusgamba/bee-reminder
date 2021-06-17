import React, { useEffect } from 'react';
import { Container, Form } from 'reactstrap';
import { useMutation } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Initial from './Content/Initial';
import { toast } from 'react-toastify';
import ResultSearch from './Content/ResultSearch';
import useReminder from '../../hooks/useReminder';
import Header from './Header';
import Filters from './Filters';
import { DELETE_REMINDER_GQL } from '../../graphql/Reminders';
import { ReminderDeleteInput } from '../../ts';
import './style.css';

const COMPONENTS = { Initial, ResultSearch };

const Reminders: React.FC = () => {
  const history = useHistory();

  const { userId, fetchListReminder } = useReminder();

  if (!userId) {
    history.push('/');
  }

  const methods = useForm<ReminderDeleteInput>({
    defaultValues: {
      remindersId: [],
    },
  });

  const { handleSubmit, setValue } = methods;

  const [deleteReminder] = useMutation(DELETE_REMINDER_GQL, {
    onCompleted: () => [toast.success('Successfully deleted'), fetchListReminder(), setValue('remindersId', [])],
    onError: () => toast.error('An error has occurred.'),
  });

  const onSubmit = handleSubmit((variables) => {
    deleteReminder({
      variables: {
        id: variables.remindersId,
      },
    });
  });

  const location = useLocation();

  const ListReminderComponent = COMPONENTS[location.search ? 'ResultSearch' : 'Initial'];

  useEffect(() => {
    setValue('remindersId', []);

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
