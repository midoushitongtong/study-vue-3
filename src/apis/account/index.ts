import config from '@/config';
import fetch from '@/utils/fetch';
import { LoginParams, LoginReturns } from './types';

export const login = (params: LoginParams): Promise<LoginReturns> => {
  return fetch.post<LoginReturns>(`${config.apiRoot}/account/login`, params).then((result) => {
    return result.data;
  });
};
