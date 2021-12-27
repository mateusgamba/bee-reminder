import React, { createContext, useContext, useMemo } from 'react';
import { ApolloError, gql, useQuery } from '@apollo/client';

interface UserData {
  id: number;
  name: string;
  email: string;
}

interface UserContext {
  loadingAccount: boolean;
  getUser: UserData;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const GET_USER = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

const UserContext = createContext({});

export function UserProvider({ children }: Props): JSX.Element {
  const { data: dataUser, loading: loadingUser } = useQuery<{ me: UserData }>(GET_USER, {
    fetchPolicy: 'no-cache',
    onError: (error: ApolloError) => {
      alert(error.message);
    },
  });

  const getUser = useMemo(() => {
    if (!dataUser?.me) {
      return;
    }

    return {
      userId: dataUser.me.id,
      userName: dataUser.me.name,
      userEmail: dataUser.me.email,
    };
  }, [dataUser?.me]);

  return <UserContext.Provider value={{ loadingUser, getUser }}>{children}</UserContext.Provider>;
}

export default function useUserContext(): UserContext {
  const context = useContext(UserContext) as UserContext;
  return context;
}
