import config from '@/config';
import fetch from '@/utils/fetch';
import { AddPostParams, AddPostReturns, GetPostDetailReturns, GetPostListReturns } from './types';

export const getPostList = (categoryId: string): Promise<GetPostListReturns> => {
  return fetch.get<GetPostListReturns>(`${config.apiRoot}/postList/${categoryId}`).then((result) => {
    return result.data;
  });
};

export const addPost = (params: AddPostParams): Promise<AddPostReturns> => {
  return fetch.post<AddPostReturns>(`${config.apiRoot}/post`, params).then((result) => {
    return result.data;
  });
};

export const getPostDetail = (id: string): Promise<GetPostDetailReturns> => {
  return fetch.get<GetPostDetailReturns>(`${config.apiRoot}/post/:${id}`).then((result) => {
    return result.data;
  });
};
