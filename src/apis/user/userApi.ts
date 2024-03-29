import { TUser } from "./../../types/user.type";
import axiosClient from "../axiosClient";

const userApi = {
  getAll: () => {
    const url = "user";
    return axiosClient.get(url);
  },
  getMe(): Promise<TUser> {
    const url = "user/me";
    return axiosClient.get(url);
  },
  findByEmail: (email: string) => {
    const url = "user/email";
    return axiosClient.post(url, {email});
  },
};

export default userApi;