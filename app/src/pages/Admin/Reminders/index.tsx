import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { format, add } from 'date-fns';
import { LIST_REMINDER_GQL } from '../../../graphql/Reminders';
import { Reminder } from '../../../ts';
import List from './List';

export default function Reminders(): JSX.Element {
  const { data: dataListReminder } = useQuery<{
    reminders: { data: Reminder[] };
  }>(LIST_REMINDER_GQL, {
    fetchPolicy: 'no-cache',
    variables: {
      filter: { date: { from: format(new Date(), 'yyyy-MM-dd'), to: format(new Date(), 'yyyy-MM-dd') } },
    },
  });

  const { data: dataListReminderNext } = useQuery<{
    reminders: { data: Reminder[] };
  }>(LIST_REMINDER_GQL, {
    fetchPolicy: 'no-cache',
    variables: {
      filter: { date: { from: format(add(new Date(), { days: 1 }), 'yyyy-MM-dd') } },
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
