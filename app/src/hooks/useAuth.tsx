import React, { useContext, useState } from 'react';
import { AuthenticationData } from '../ts';
import { getAuthCookie, setAuthCookie, removeAuthCookie } from '../utils/setAuthTokens';

interface AuthContextData {
  setAuthorization(data: AuthenticationData): void;
  clearAuthorization(): void;
  authenticated: AuthenticationData | undefined;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const AuthContext = React.createContext({});

export function UseAuthProvider({ children }: Props): JSX.Element {
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
}

export default function useAuthContext(): AuthContextData {
  return useContext(AuthContext) as AuthContextData;
}
