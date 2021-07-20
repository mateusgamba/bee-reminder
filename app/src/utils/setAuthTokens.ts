import Cookie from 'js-cookie';
import { AuthenticationData } from '../ts/auth';

export const setCookie = (key: string, data: AuthenticationData): void => {
  Cookie.set(key, JSON.stringify(data));
};

export const removeCookie = (key: string): void => {
  Cookie.remove(key);
};

export const getCookie = (key: string): AuthenticationData | undefined => {
  const value = Cookie.get(key);
  return value ? JSON.parse(value) : undefined;
};
