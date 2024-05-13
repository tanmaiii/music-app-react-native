import { TUser } from "./user.type";

export type ReqLogin = {
  email: string;
  password: string;
};

export type ResLoginApi = {
  data: TUser;
  token: string;
};

export type ResVerifyForgotPassword = {
  success: boolean;
  data: {
    resetPasswordToken: string;
  };
};

export type TStateAuth = {
  value: string;
  err: string;
  loading: boolean;
  focus: boolean;
  view: boolean;
};