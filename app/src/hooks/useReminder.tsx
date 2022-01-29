import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { DELETE_REMINDER_GQL } from '../graphql/Reminders';

interface ReminderDeleteIdVariables {
  variables: { id: number[] };
}

interface ReminderContextData {
  deleteReminder(variables: ReminderDeleteIdVariables): void;
  deleteReminderLoading: boolean;
}

export const ReminderContext = React.createContext({});

export const UseReminderProvider: React.FC = ({ children }) => {
  const [deleteReminder, { loading: deleteReminderLoading }] = useMutation(DELETE_REMINDER_GQL, {
    onCompleted: () => [toast.success('Successfully deleted')],
    onError: () => toast.error('An error has occurred.'),
    refetchQueries: ['reminders'],
  });

  const contextValues: ReminderContextData = {
    deleteReminder,
    deleteReminderLoading,
  };
  return <ReminderContext.Provider value={contextValues}>{children}</ReminderContext.Provider>;
};

export default function useReminderContext(): ReminderContextData {
  return useContext(ReminderContext) as ReminderContextData;
}
