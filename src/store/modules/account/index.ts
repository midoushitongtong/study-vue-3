import {
  User,
  AccountState,
  AccountMutations,
  AccountActions,
  AccountActionContext,
} from '@/store/modules/account/types';

const initState: AccountState = {
  user: null,
};

export default {
  state: initState,
  mutations: {
    [AccountMutations.UPDATE_USER](state: AccountState, user: User): void {
      state.user = user;
    },
  },
  actions: {
    [AccountActions.UPDATE_USER]({ commit }: AccountActionContext, user: User): void {
      commit(AccountMutations.UPDATE_USER, user);
    },
  },
  getters: {},
};
