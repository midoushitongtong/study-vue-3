import { Category } from '@/apis/category/types';
import { Post } from '@/apis/post/types';
import { RootState } from '@/store/types';
import { ActionContext } from 'vuex';

// content state
export type ContentState = {
  // 分类分类列表
  categoryList: Category[];
  // 文章列表
  postList: Post[];
};

// content mutations
export enum ContentMutations {
  UPDATE_CATEGORY_LIST = 'content/updateCategoryList',
  UPDATE_POST_LIST = 'content/updatePostList',
}

// content actions
export enum ContentActions {
  UPDATE_CATEGORY_LIST = 'content/updateCategoryList',
  UPDATE_POST_LIST = 'content/updatePostList',
}

// content getters
export enum ContentGetters {
  CATEROTY_BY_CATEGORY_ID = 'conent/categoryByCategoryId',
  POST_LIST_BY_CATEGORY_ID = 'conent/postListByCategoryId',
}

// content action context
export type ContentActionContext = ActionContext<ContentState, RootState>;
