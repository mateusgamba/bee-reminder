import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { LIST_REMINDER_GQL } from '../../../graphql/Reminders';
import { Reminder } from '../../../ts';
import List from './List';
import './style.css';

export default function Reminders(): JSX.Element {
  const { data: dataListReminder } = useQuery<{
    reminders: { data: Reminder[] };
  }>(LIST_REMINDER_GQL, {
    fetchPolicy: 'no-cache',
    variables: {
      filter: { date: { from: moment().format('YYYY-M-D'), to: moment().format('YYYY-M-D') } },
    },
  });

  const { data: dataListReminderNext } = useQuery<{
    reminders: { data: Reminder[] };
  }>(LIST_REMINDER_GQL, {
    fetchPolicy: 'no-cache',
    variables: {
      filter: { date: { from: moment().add(1, 'd').format('YYYY-M-D') } },
    },
  });

  const listToday = useMemo(() => {
    return dataListReminder?.reminders.data ?? [];
  }, [dataListReminder]);

  const listNext = useMemo(() => {
    return dataListReminderNext?.reminders.data ?? [];
  }, [dataListReminderNext]);

  return (
    <>
      <List reminders={listToday} title="Today" />
      <List reminders={listNext} title="Next Days" showDate={true} />
    </>
  );
}
