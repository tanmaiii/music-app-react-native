import { ResVerifyForgotPassword } from "./../../types/auth.type";
import { TUser, ResLoginApi } from "./../../types";
import axiosClient from "../../configs/axios/axiosClient";

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

  signout() {
    const url = "auth/signout";
    return axiosClient.get(url);
  },
  checkEmail(email: string) {
    const url = "user/email";
    return axiosClient.post(url, { email });
  },
  sendVerifyEmail(token: string, email: string): Promise<{ success: boolean; data: string }> {
    const url = "auth/send-verify-email";
    return axiosClient.post(
      url,
      { email },
      {
        headers: {
          authorization: token,
        },
      }
    );
  },
  verifyEmail(
    token: string,
    email: string,
    code: string
  ): Promise<{ success: boolean; data: string }> {
    const url = "auth/verify-email";
    return axiosClient.post(
      url,
      { email, code },
      {
        headers: {
          authorization: token,
        },
      }
    );
  },
  sendVerifyAccount(email: string) {
    const url = "auth/send-verify-account";
    return axiosClient.post(url, { email });
  },
  verifyAccount(email: string, code: string) {
    const url = "auth/verify-account";
    return axiosClient.post(url, { email, code });
  },
  verifyForgotPassword(email: string, code: string): Promise<ResVerifyForgotPassword> {
    const url = "auth/verify-forgot-password";
    return axiosClient.post(url, { email, code });
  },
  changePassword(token: string, password: string, passwordOld: string) {
    const url = "auth/change-password";
    return axiosClient.post(
      url,
      {
        password,
        passwordOld,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  },
  resetPassword(resetPasswordToken: string, password: string) {
    const url = "auth/reset-password";
    return axiosClient.post(`${url}?token=${resetPasswordToken}`, {
      password,
    });
  },
};

export default authApi;
