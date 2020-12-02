import { Category } from './types';

export const getCategoryList = (): Promise<Category[]> => {
  return new Promise((resolve) => {
    resolve([
      {
        id: 1,
        title: 'test1专栏',
        description: '这是test1专栏, 有一段非常有意思的简介, 可以更新一下',
        avatar: 'https://pic4.zhimg.com/80/v2-38b6c8c673d7431e8ebc4014c8c58d02_720w.jpg?source=1940ef5c',
      },
      {
        id: 2,
        title: 'test2专栏',
        description: '这是test2专栏, 有一段非常有意思的简介, 可以更新一下',
        avatar: 'https://pic4.zhimg.com/80/v2-e7a286a48b91ddf9382979c9dcc90b11_720w.jpg?source=1940ef5c',
      },
      {
        id: 3,
        title: 'test3专栏',
        description: '这是test3专栏, 有一段非常有意思的简介, 可以更新一下',
      },
      {
        id: 4,
        title: 'test4专栏',
        description: '这是test4专栏, 有一段非常有意思的简介, 可以更新一下',
        avatar: 'https://pic4.zhimg.com/80/v2-040e20fbae43ff6c7597bafddeb45bff_720w.jpg?source=1940ef5c',
      },
    ]);
  });
};
