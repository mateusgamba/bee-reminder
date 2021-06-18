/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState, useMemo } from 'react';
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { DELETE_REMINDER_GQL, LIST_REMINDER_GQL } from '../graphql/Reminders';
import { Reminder } from '../ts';

interface ReminderFilterInputVariables {
  filter: {
    user_id: number;
    date?: {
      from?: Date;
      to?: Date;
    };
  };
}

interface ReminderDeleteIdVariables {
  variables: { id: number[] };
}

interface ReminderContextData {
  userId: number | null;
  setUserId(userId: number | null): void;
  fetchListReminder(variables?: ReminderFilterInputVariables): void;
  deleteReminder(variables: ReminderDeleteIdVariables): void;
  deleteReminderLoading: boolean;
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
    fetchPolicy: 'no-cache',
    variables: {
      filter: { user_id: userId, date: { from: moment().format('YYYY-M-D') } },
    },
  });

  const listReminder = useMemo(() => dataListReminder?.reminders?.data ?? [], [dataListReminder?.reminders?.data]);

  const [deleteReminder, { loading: deleteReminderLoading }] = useMutation(DELETE_REMINDER_GQL, {
    onCompleted: () => [toast.success('Successfully deleted'), fetchListReminder()],
    onError: () => toast.error('An error has occurred.'),
  });

  const contextValues: ReminderContextData = {
    userId,
    setUserId,
    fetchListReminder,
    listReminder,
    deleteReminder,
    deleteReminderLoading,
  };
  return <ReminderContext.Provider value={contextValues}>{children}</ReminderContext.Provider>;
};

export default function useReminderContext(): ReminderContextData {
  return useContext(ReminderContext) as ReminderContextData;
}
