import { gql } from '@apollo/client';

export const CREATE_USER_GQL = gql`
  mutation createUser($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
    createUser(name: $name, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
      access_token
      refresh_token
      token_type
      expires_in
      refresh_token_expires_in
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
