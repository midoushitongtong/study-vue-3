import config from '@/config';
import fetch from '@/utils/fetch';
import { AddPostParams, AddPostReturns, GetPostListReturns } from './types';

export const getPostList = (): Promise<GetPostListReturns> => {
  return fetch.get<GetPostListReturns>(`${config.apiRoot}/postList`).then((result) => {
    return result.data;
  });
};

export const addPost = (params: AddPostParams): Promise<AddPostReturns> => {
  return fetch.post<AddPostReturns>(`${config.apiRoot}/post`, params, {}).then((result) => {
    return result.data;
  });
};
