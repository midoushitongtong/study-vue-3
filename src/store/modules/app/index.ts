import { AppState, AppMutations, AppActions, AppActionContext } from '@/store/modules/app/types';

const initState: AppState = {
  initDataComplete: false,
};

export default {
  state: initState,
  mutations: {
    [AppMutations.UPDATE_INIT_DATA_COMPLETE](state: AppState, initDataComplete: boolean): void {
      state.initDataComplete = initDataComplete;
    },
  },
  actions: {
    [AppActions.UPDATE_INIT_DATA_COMPLETE](
      { commit }: AppActionContext,
      initDataComplete: boolean
    ): void {
      commit(AppMutations.UPDATE_INIT_DATA_COMPLETE, initDataComplete);
    },
  },
  getters: {},
};
