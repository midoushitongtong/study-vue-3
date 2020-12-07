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
  data: {
    accessToken: string;
  };
};

export type RegisterParams = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterReturns = {
  code: number;
  data: {
    accessToken: string;
  };
};

export type UserInfoReturns = {
  code: number;
  data: {
    categoryId: number;
    name: number;
  };
};
