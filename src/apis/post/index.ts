import config from '@/config';
import fetch from '@/utils/fetch';
import { GetPostListReturns } from './types';

export const getPostList = (): Promise<GetPostListReturns> => {
  return fetch.get<GetPostListReturns>(`${config.apiRoot}/postList`).then((result) => {
    return result.data;
  });
};
