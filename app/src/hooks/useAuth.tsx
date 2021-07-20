import React, { useContext, useState } from 'react';
import Cookie from 'js-cookie';
import { AuthenticationData } from '../ts';

interface AuthContextData {
  setAuthorization(data: AuthenticationData): void;
  validated: AuthenticationData | undefined;
  clearAuthorization(): void;
  authenticated: AuthenticationData | undefined;
}

interface Props {
  children: JSX.Element | JSX.Element[];
  authenticated?: AuthenticationData;
}

export const AuthContext = React.createContext({});

export const UseAuthProvider: React.FC<Props> = ({ children, authenticated }) => {
  const [validated, setValidated] = useState<AuthenticationData | undefined>(authenticated);

  const setAuthorization = (accessData: AuthenticationData) => {
    Cookie.set('bee-authorization', JSON.stringify(accessData));
    setValidated(accessData);
  };

  const clearAuthorization = () => {
    setValidated(undefined);
    Cookie.remove('bee-authorization');
  };

  return (
    <AuthContext.Provider
      value={{
        setAuthorization,
        validated,
        clearAuthorization,
        authenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext(): AuthContextData {
  return useContext(AuthContext) as AuthContextData;
}
