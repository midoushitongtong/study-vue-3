export type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  categoryId: number;
};

export type GetPostListReturns = {
  data: Post[];
  pageNumber: number;
  pageSize: number;
  total: number;
};
