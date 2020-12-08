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

export type AddPostParams = void;

export type AddPostReturns = void;

export type UploadFileReturns = {
  code: number;
  url: string;
};
