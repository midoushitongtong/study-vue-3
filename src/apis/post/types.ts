export type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  categoryId: number;
};

export type PostDetail = Post & {
  author: {
    id: number;
    name: string;
  };
};

export type GetPostListReturns = {
  data: Post[];
  pageNumber: number;
  pageSize: number;
  total: number;
};

export type GetPostDetailReturns = {
  data: PostDetail;
};

export type AddPostParams = Partial<Post>;

export type AddPostReturns = void;

export type UploadFileReturns = {
  url: string;
};
