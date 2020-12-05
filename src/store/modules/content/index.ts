import { Category } from '@/apis/category/types';
import { Post } from '@/apis/post/types';
import {
  ContentState,
  ContentMutations,
  ContentActions,
  ContentActionContext,
  ContentGetters,
} from '@/store/modules/content/types';

const initState: ContentState = {
  categoryList: [],
  postList: [],
};

export default {
  state: initState,
  mutations: {
    [ContentMutations.UPDATE_CATEGORY_LIST]: (state: ContentState, categoryList: Category[]): void => {
      state.categoryList = categoryList;
    },
    [ContentMutations.UPDATE_POST_LIST]: (state: ContentState, postList: Post[]): void => {
      state.postList = postList;
    },
  },
  actions: {
    [ContentActions.UPDATE_CATEGORY_LIST]: (
      { commit }: ContentActionContext,
      categoryList: Category[]
    ): void => {
      commit(ContentMutations.UPDATE_CATEGORY_LIST, categoryList);
    },
    [ContentActions.UPDATE_POST_LIST]: ({ commit }: ContentActionContext, postList: Post[]): void => {
      commit(ContentMutations.UPDATE_POST_LIST, postList);
    },
  },
  getters: {
    // 根据分类 id 获取分类详情
    [ContentGetters.CATEROTY_BY_CATEGORY_ID]: (state: ContentState) => (
      categoryId: string
    ): Category | undefined => {
      return state.categoryList.find((item) => item.id === categoryId);
    },
    // 根据分类 id 获取文章列表
    [ContentGetters.POST_LIST_BY_CATEGORY_ID]: (state: ContentState) => (categoryId: number): Post[] => {
      return state.postList.filter((item) => item.categoryId === categoryId);
    },
  },
};
