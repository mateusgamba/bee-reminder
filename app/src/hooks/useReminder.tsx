import React, { useContext, useMemo } from 'react';
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { DELETE_REMINDER_GQL, LIST_REMINDER_GQL } from '../graphql/Reminders';
import { Reminder } from '../ts';

interface ReminderFilterInputVariables {
  filter: {
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
  fetchListReminder(variables?: ReminderFilterInputVariables): void;
  deleteReminder(variables: ReminderDeleteIdVariables): void;
  deleteReminderLoading: boolean;
  listReminder: Reminder[];
}

export const ReminderContext = React.createContext({});

export const UseReminderProvider: React.FC = ({ children }) => {
  const { data: dataListReminder, refetch: fetchListReminder } = useQuery<{
    reminders: { data: Reminder[] };
  }>(LIST_REMINDER_GQL, {
    fetchPolicy: 'no-cache',
    variables: {
      filter: { date: { from: moment().format('YYYY-M-D') } },
    },
  });

  const listReminder = useMemo(() => dataListReminder?.reminders?.data ?? [], [dataListReminder?.reminders?.data]);

  const [deleteReminder, { loading: deleteReminderLoading }] = useMutation(DELETE_REMINDER_GQL, {
    onCompleted: () => [toast.success('Successfully deleted'), fetchListReminder()],
    onError: () => toast.error('An error has occurred.'),
  });

  const contextValues: ReminderContextData = {
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
