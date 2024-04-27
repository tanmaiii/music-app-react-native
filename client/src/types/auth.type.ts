import { TUser } from "./user.type";

export type ReqLogin = {
  email: string;
  password: string;
};

export type ResLoginApi = {
  data: TUser;
  token: string;
};
