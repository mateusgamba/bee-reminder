import { ApolloError, useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LOGIN_GQL } from '../graphql/Auth';
import { AuthenticationData, LoginInput } from '../ts';
import { getAuthCookie, setAuthCookie, removeAuthCookie } from '../utils/setAuthTokens';

interface LoginInputVaraibles {
  variables: LoginInput;
}

interface AuthContextData {
  setAuthorization(data: AuthenticationData): void;
  clearAuthorization(): void;
  authenticated: AuthenticationData | undefined;
  login(variables: LoginInputVaraibles): void;
  loginLoading: boolean;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthContext = React.createContext({});

export const UseAuthProvider: React.FC<Props> = ({ children }) => {
  const history = useHistory();
  const authentication = getAuthCookie('bee');
  const [authenticated, setAuthenticated] = useState<string | undefined>(authentication);

  const setAuthorization = (accessData: AuthenticationData) => {
    setAuthCookie('bee', accessData);
    setAuthenticated(accessData.access_token);
  };

  const clearAuthorization = () => {
    setAuthenticated(undefined);
    removeAuthCookie('bee');
  };

  const [login, { loading: loginLoading, data: dataLogin }] = useMutation(LOGIN_GQL, {
    onCompleted: (response) => {
      setAuthorization(response.login);
      history.push('/');
    },
    onError: (error: ApolloError) => {
      console.log(error.message);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        setAuthorization,
        authenticated,
        clearAuthorization,
        login,
        loginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext(): AuthContextData {
  return useContext(AuthContext) as AuthContextData;
}
