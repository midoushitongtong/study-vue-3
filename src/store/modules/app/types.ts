import { RootState } from '@/store/types';
import { ActionContext } from 'vuex';

export type App = {
  initDataComplete: boolean;
};

// app state
export type AppState = {
  // 数据是否初始化完成
  initDataComplete: boolean;
};

// app mutations
export enum AppMutations {
  UPDATE_INIT_DATA_COMPLETE = 'app/initDatComplete',
}

// app actions
export enum AppActions {
  UPDATE_INIT_DATA_COMPLETE = 'app/initDatComplete',
}

// app action context
export type AppActionContext = ActionContext<AppState, RootState>;
