import config from '@/config';
import fetch from '@/utils/fetch';
import { GetCategoryDetailReturns, GetCategoryListReturns } from './types';

export const getCategoryList = (): Promise<GetCategoryListReturns> => {
  return fetch.get<GetCategoryListReturns>(`${config.apiRoot}/categoryList`).then((result) => {
    return result.data;
  });
};

export const getCategoryDetial = (id: string): Promise<GetCategoryDetailReturns> => {
  return fetch.get<GetCategoryDetailReturns>(`${config.apiRoot}/category/${id}`).then((result) => {
    return result.data;
  });
};
