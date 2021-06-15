import { gql } from '@apollo/client';

export const LIST_REMINDER_GQL = gql`
  query reminders($filter: ReminderFilterInput!) {
    reminders(first: 1000, filter: $filter) {
      data {
        id
        description
        date
      }
    }
  }
`;

export const DELETE_REMINDER_GQL = gql`
  mutation deleteReminder($id: ID!) {
    deleteReminder(id: $id) {
      message
    }
  }
`;

export const CREATE_REMINDER_GQL = gql`
  mutation createReminder($description: String!, $date: String!, $user_id: ID!) {
    createReminder(description: $description, date: $date, user_id: $user_id) {
      id
    }
  }
`;
