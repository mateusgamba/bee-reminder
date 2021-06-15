import { gql } from '@apollo/client';

export const CREATE_USER_GQL = gql`
  mutation createUser($email: String!) {
    createUser(email: $email) {
      id
      email
    }
  }
`;
