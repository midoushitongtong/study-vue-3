import { createStore, Store, useStore as baseUseStore, createLogger } from 'vuex';
import account from '@/store/modules/account';
import content from '@/store/modules/content';
import { RootState } from './types';
import { InjectionKey } from 'vue';

const debug = process.env.NODE_ENV !== 'production';

const store = createStore<RootState>({
  modules: {
    account,
    content,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export const key: InjectionKey<Store<RootState>> = Symbol();

export const useStore = (): Store<RootState> => {
  return baseUseStore(key);
};

export default store;
