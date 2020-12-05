export type User = {
  isLogin: boolean;
  name?: string;
  avatar?: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginReturns = {
  code: number;
};
