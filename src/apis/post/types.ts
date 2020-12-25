// 文章列表
export type Post = {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
};

// 文章详情
export type PostDetail = Post & {
  author: {
    id: number;
    name: string;
  };
};

// 获取文章列表
export type GetPostListReturns = {
  data: Post[];
  pageNumber: number;
  pageSize: number;
  total: number;
};

// 获取文章详情
export type GetPostDetailReturns = {
  data: PostDetail;
};

// 添加文章参数
export type AddPostParams = {
  title: string;
  content: string;
  image?: string;
  createdAt: string;
};

// 添加文章返回参数
export type AddPostReturns = void;

// 修改文章请求参数
export type EditPostParams = {
  id: string;
  title: string;
  content: string;
  image?: string;
};

// 修改文章返回参数
export type EditPostReturns = void;

// 删除文章请求参数
export type DeletePostParams = {
  id: string;
};

// 删除文章返回参数
export type DeletePostReturns = void;

// 上传图片参数
export type UploadFileReturns = {
  url: string;
};
