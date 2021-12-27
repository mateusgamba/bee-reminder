import { gql } from '@apollo/client';

export const CREATE_USER_GQL = gql`
  mutation createUser($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
    createUser(name: $name, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
      id
      email
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query currentUser {
    me {
      id
      email
      name
    }
  }
`;
