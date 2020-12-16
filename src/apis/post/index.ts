import config from '@/config';
import fetch from '@/utils/fetch';
import {
  AddPostParams,
  AddPostReturns,
  EditPostParams,
  EditPostReturns,
  GetPostDetailReturns,
  GetPostListReturns,
} from './types';

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

export const editPost = (params: EditPostParams): Promise<EditPostReturns> => {
  return fetch.put<EditPostReturns>(`${config.apiRoot}/post/${params.id}`, params).then((result) => {
    return result.data;
  });
};

export const getPostDetail = (id: string): Promise<GetPostDetailReturns> => {
  return fetch.get<GetPostDetailReturns>(`${config.apiRoot}/post/:${id}`).then((result) => {
    return result.data;
  });
};
