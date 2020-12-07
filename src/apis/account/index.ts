import config from '@/config';
import fetch from '@/utils/fetch';
import { LoginParams, LoginReturns, RegisterParams, RegisterReturns, UserInfoReturns } from './types';

export const login = (params: LoginParams): Promise<LoginReturns> => {
  return fetch.post<LoginReturns>(`${config.apiRoot}/account/login`, params).then((result) => {
    return result.data;
  });
};

export const register = (params: RegisterParams): Promise<RegisterReturns> => {
  return fetch.post<RegisterReturns>(`${config.apiRoot}/account/register`, params).then((result) => {
    return result.data;
  });
};

export const getUserInfo = (): Promise<UserInfoReturns> => {
  return fetch.get<UserInfoReturns>(`${config.apiRoot}/account/user-info`).then((result) => {
    return result.data;
  });
};
