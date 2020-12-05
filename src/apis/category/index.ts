import config from '@/config';
import fetch from '@/utils/fetch';
import { GetCategoryListReturns } from './types';

export const getCategoryList = (): Promise<GetCategoryListReturns> => {
  return fetch.get<GetCategoryListReturns>(`${config.apiRoot}/categoryList`).then((result) => {
    return result.data;
  });
};
