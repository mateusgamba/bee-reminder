import Cookies from 'js-cookie';
import { addSeconds } from 'date-fns';
import { AuthenticationData } from '../ts/auth';

export enum TokenTypeEnum {
  Token,
  Refresh,
}

export const setAuthCookie = (key: string, data: AuthenticationData): void => {
  Cookies.set(`${key}-token`, data.access_token, {
    secure: true,
    expires: addSeconds(new Date(), data.expires_in),
  });

  Cookies.set(`${key}-refresh-token`, data.refresh_token, {
    secure: true,
    expires: addSeconds(new Date(), data.refresh_token_expires_in),
  });
};

export const removeAuthCookie = (key: string): void => {
  Cookies.remove(`${key}-token`);
  Cookies.remove(`${key}-refresh-token`);
};

export const getAuthCookie = (key: string, type?: TokenTypeEnum): string | undefined => {
  return Cookies.get(`${key}${type === TokenTypeEnum.Refresh ? '-refresh' : ''}-token`);
};
