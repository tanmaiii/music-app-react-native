import { TUser } from "./../../types/user.type";
import axiosClient from "../axiosClient";

const userApi = {
  getAll: () => {
    const url = "user";
    return axiosClient.get(url);
  },
  getMe(token: string): Promise<TUser> {
    const url = "user/me";
    return axiosClient.post(url, {token});
  },
  findByEmail: (email: string) => {
    const url = "user/email";
    return axiosClient.post(url, { email });
  },
};

export default userApi;
