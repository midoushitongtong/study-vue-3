import { AccountState } from '@/store/modules/account/types';
import { AppState } from './modules/app/types';

export type RootState = {
  app: AppState;
  account: AccountState;
};
