import { TUser, ResLoginApi } from "./../../types";
import axiosClient from "../axiosClient";

//: Promise<ResLoginApi>
const authApi = {
  signin(email: string, password: string): Promise<ResLoginApi> {
    const url = "auth/signin";
    return axiosClient.post(url, { email, password });
  },
  signup(name: string, email: string, password: string): Promise<TUser> {
    const url = "auth/signup";
    return axiosClient.post(url, { name, email, password });
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
