import { Post } from './types';

export const getPostList = (): Promise<Post[]> => {
  return new Promise((resolve) => {
    resolve([
      {
        id: 1,
        title: '这是我的第一篇文章',
        content:
          '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
        image: 'https://pic1.zhimg.com/80/v2-4551acdffef68b5e25e6eafbdef8f8d0_720w.jpg?source=1940ef5c',
        createdAt: '2020-06-11 10:34:22',
        categoryId: 1,
      },
      {
        id: 2,
        title: '这是我的第二篇文章',
        content:
          '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
        createdAt: '2020-06-11 10:34:22',
        categoryId: 1,
      },
      {
        id: 3,
        title: '这是我的第三篇文章',
        content:
          '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
        image: 'https://pic2.zhimg.com/80/v2-c4a80e31fd6b1672d205d54cf92d6a5f_720w.jpg?source=1940ef5c',
        createdAt: '2020-06-11 10:34:22',
        categoryId: 1,
      },
      {
        id: 3,
        title: '这是我的第四篇文章',
        content:
          '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
        image: 'https://pic2.zhimg.com/80/v2-46e1d3d5c9ce6bad146107b3b12798c6_720w.jpg?source=1940ef5c',
        createdAt: '2020-06-11 10:34:22',
        categoryId: 1,
      },
      {
        id: 3,
        title: '这是我的第无篇文章',
        content:
          '"this is a new post you Very often we will need to map routes with the given pattern to the same component. For example we may have a User component which should be rendered for all users but with dif..."',
        image: 'https://pic1.zhimg.com/80/v2-b96224c5ddc65f5d63479fa1d68a9c73_720w.jpg?source=1940ef5c',
        createdAt: '2020-06-11 10:34:22',
        categoryId: 1,
      },
    ]);
  });
};
