import { gql } from '@apollo/client';

export const LOGIN_GQL = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
      token_type
      expires_in
      refresh_token_expires_in
    }
  }
`;

export const LOGOUT_GQL = gql`
  mutation logout {
    logout {
      message
    }
  }
`;
