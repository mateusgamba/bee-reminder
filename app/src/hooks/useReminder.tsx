import React, { useContext, useState, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { LIST_REMINDER_GQL } from '../graphql/Reminders';
import { Reminder } from '../ts';
import moment from 'moment';

interface ReminderFilterInputVariables {
  filter: {
    user_id: string;
  };
}

interface ReminderContextData {
  userId: number | null;
  setUserId(userId: number | null): void;
  fetchListReminder(variables?: ReminderFilterInputVariables): void;
  listReminder: Reminder[];
}

export const ReminderContext = React.createContext({});

export const UseReminderProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(() => {
    const id = sessionStorage.getItem('userId');
    return !!id ? Number(id) : null;
  });

  const { data: dataListReminder, refetch: fetchListReminder } = useQuery<{
    reminders: { data: Reminder[] };
  }>(LIST_REMINDER_GQL, {
    skip: !userId,
    variables: {
      filter: { user_id: userId, date: { from: moment().format('YYYY-M-D') } },
    },
  });

  const listReminder = useMemo(() => dataListReminder?.reminders?.data ?? [], [dataListReminder?.reminders?.data]);

  const contextValues: ReminderContextData = {
    userId,
    setUserId,
    fetchListReminder,
    listReminder,
  };
  return <ReminderContext.Provider value={contextValues}>{children}</ReminderContext.Provider>;
};

export default function useReminderContext(): ReminderContextData {
  return useContext(ReminderContext) as ReminderContextData;
}
