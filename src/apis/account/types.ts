export type User = {
  id: number;
  name: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginReturns = {
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
  data: {
    accessToken: string;
  };
};

export type UserInfoReturns = {
  data: {
    id: number;
    name: number;
  };
};
