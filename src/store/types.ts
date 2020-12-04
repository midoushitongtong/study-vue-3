import { AccountState } from '@/store/modules/account/types';
import { ContentState } from './modules/content/types';

export type RootState = {
  account: AccountState;
  content: ContentState;
};
