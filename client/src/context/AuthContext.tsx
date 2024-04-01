import React, { createContext, useContext, useEffect, useState } from "react";
// import { authApi, useApi } from "../apis";
import { TUser } from "../types/index";
import { authApi } from "../apis";
import userApi from "../apis/user/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Khai báo kiểu dữ liệu cho AuthContext
interface IAuthContext {
  currentUser: TUser | null;
  setCurrentUser: (user: TUser) => void;
  logout: () => void;
  login: (email: string, password: string) => void;
  token: string | null;
}

// Tạo AuthContext với giá trị mặc định là null
const AuthContext = createContext<IAuthContext | null>(null);

export function useAuth() {
  return useContext(AuthContext)!; // Bạn cần xác nhận rằng giá trị không phải null
}

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<TUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const logout = async () => {
    setCurrentUser(null);
    setToken(null);
    await authApi.signout();
  };

  const login = async (email: string, password: string) => {
    const res = await authApi.signin(email, password);
    setCurrentUser(res.data);
    setToken(res.token);
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await authApi.signup(name, email, password);
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await userApi.getMe(token);
        setCurrentUser(res);
        console.log("Get Me", res);
      } catch (error) {
        console.log("Get Me", error);
        setCurrentUser(null);
      }
    };
    token && getInfo();
  }, []);

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const userStorage = await AsyncStorage.getItem("user");
        userStorage ? setCurrentUser(JSON.parse(userStorage)) : setCurrentUser(null);

        const tokenStorage = await AsyncStorage.getItem("token");
        tokenStorage ? setToken(JSON.parse(tokenStorage)) : setToken(null);
      } catch (error) {
        console.error("Error getting user from AsyncStorage:", error);
        return null;
      }
    };
    getUserFromStorage();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("user", JSON.stringify(currentUser));
    AsyncStorage.setItem("token", JSON.stringify(token));
  }, [currentUser, token]);

  // Cập nhật giá trị của AuthContextProvider
  const contextValue: IAuthContext = {
    currentUser,
    setCurrentUser,
    token,
    logout,
    login,
  };

  // Sử dụng AuthContext.Provider để cung cấp giá trị cho các component con
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
