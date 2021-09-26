import React, { useContext, useState } from 'react';
import { AuthenticationData } from '../ts';
import { getCookie, setCookie, removeCookie } from '../utils/setAuthTokens';

interface AuthContextData {
  setAuthorization(data: AuthenticationData): void;
  clearAuthorization(): void;
  authenticated: AuthenticationData | undefined;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthContext = React.createContext({});

export const UseAuthProvider: React.FC<Props> = ({ children }) => {
  const authentication = getCookie('bee-authorization');
  const [authenticated, setAuthenticated] = useState<AuthenticationData | undefined>(authentication);

  const setAuthorization = (accessData: AuthenticationData) => {
    setCookie('bee-authorization', accessData);
    setAuthenticated(accessData);
  };

  const clearAuthorization = () => {
    setAuthenticated(undefined);
    removeCookie('bee-authorization');
  };

  return (
    <AuthContext.Provider
      value={{
        setAuthorization,
        authenticated,
        clearAuthorization,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext(): AuthContextData {
  return useContext(AuthContext) as AuthContextData;
}
