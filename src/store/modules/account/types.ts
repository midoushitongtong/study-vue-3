import { RootState } from '@/store/types';
import { ActionContext } from 'vuex';

export type User = {
  id: number;
  name: string;
};

// account state
export type AccountState = {
  // 用户信息
  user: null | User;
};

// account mutations
export enum AccountMutations {
  UPDATE_USER = 'account/updateUser',
}

// account actions
export enum AccountActions {
  UPDATE_USER = 'account/updateUser',
}

// account action context
export type AccountActionContext = ActionContext<AccountState, RootState>;
