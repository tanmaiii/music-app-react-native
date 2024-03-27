import { TUser } from "./../../types";
import axiosClient from "../axiosClient";

//: Promise<ResLoginApi>
const authApi = {
  signin(email: string, password: string): Promise<TUser> {
    const url = "auth/signin";
    return axiosClient.post(url, { email, password });
  },
  signup(
    email: string,
    password: string,
    name: string,
    brithday: string,
    gender: string
  ): Promise<TUser> {
    const url = "auth/signup";
    return axiosClient.post(url, { email, password, name, brithday, gender });
  },
  sendVerificationEmail(email: string) {
    const url = "auth/send-verification-email";
    return axiosClient.post(url, { email });
  },
  verifyEmail(token: string | null) {
    const url = "auth/verify-email?token=";
    return axiosClient.post(url + token);
  },
  signout() {
    const url = "auth/signout";
    return axiosClient.get(url);
  },
};

export default authApi;
