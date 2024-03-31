import { TUser } from "./user.type";

export type ReqLogin = {
  // username: string;
  email: string;
  password: string;
};

export type ResLoginApi = {
  data: TUser;
  token: string;
};
