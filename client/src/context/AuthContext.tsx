import React, { createContext, useContext, useEffect, useState } from "react";
// import { authApi, useApi } from "../apis";
import { TUser } from "../types/index";
import { authApi } from "../apis";
import userApi from "../apis/user/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Khai báo kiểu dữ liệu cho AuthContext
interface IAuthContext {
  currentUser: TUser | null;
  setCurrentUser: (user: TUser) => void;
  logout: () => void;
  login: (email: string, password: string) => void;
  token: string | null;
  loadingAuth: boolean;
}

// Tạo AuthContext với giá trị mặc định là null
export const AuthContext = createContext<IAuthContext | null>(null);

export function useAuth() {
  return useContext(AuthContext)!; // Bạn cần xác nhận rằng giá trị không phải null
}

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<TUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const logout = async () => {
    setCurrentUser(null);
    setToken(null);
    await authApi.signout();
  };

  const login = async (email: string, password: string) => {
    setLoadingAuth(true);
    const res = await authApi.signin(email, password);
    setLoadingAuth(false);
    if (res) {
      setCurrentUser(res.data);
      setToken(res.token);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await authApi.signup(name, email, password);
  };

  const getInfo = async () => {
    setLoadingAuth(true);
    try {
      const res = await userApi.getMe(token);
      res ? setCurrentUser(res) : setCurrentUser(null);
      console.log("Get Me", res);
      setLoadingAuth(false);
      return res;
    } catch (error) {
      console.log("Get Me :", error.response.data);
    }
    setLoadingAuth(false);
    return null;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getInfo,
  });

  // useEffect(() => {
  //   if (token) {
  //     getInfo(); // Gọi hàm getInfo khi token tồn tại
  //     const intervalId = setInterval(() => {
  //       queryClient.invalidateQueries({ queryKey: ["currentUser"] });
  //     }, 60000); // 60 giây (đơn vị tính là mili giây)

  //     // Return một hàm trong useEffect để xóa interval khi component unmount
  //     return () => clearInterval(intervalId);
  //   }
  // }, [token]); // Thêm token vào dependency array của useEffect

  useEffect(() => {
    const getUserStorage = async () => {
      try {
        const userStorage = await AsyncStorage.getItem("user");
        userStorage ? setCurrentUser(JSON.parse(userStorage)) : setCurrentUser(null);
      } catch (error) {
        console.error("Error getting user from AsyncStorage:", error);
        return null;
      }
    };

    const getTokenStorage = async () => {
      try {
        const tokenStorage = await AsyncStorage.getItem("token");
        tokenStorage ? setToken(JSON.parse(tokenStorage)) : setToken(null);
      } catch (error) {
        console.error("Error getting user from AsyncStorage:", error);
        return null;
      }
    };

    getUserStorage();
    getTokenStorage();
  }, []);

  useEffect(() => {
    // Chuyển đổi object thành chuỗi JSON
    const currentUserJSON = JSON.stringify(currentUser);
    const tokenJSON = JSON.stringify(token);

    // Lưu vào AsyncStorage với các key tương ứng
    AsyncStorage.setItem("token", tokenJSON);
    AsyncStorage.setItem("user", currentUserJSON);
  }, [currentUser, token]);

  // Cập nhật giá trị của AuthContextProvider
  const contextValue: IAuthContext = {
    currentUser,
    setCurrentUser,
    token,
    logout,
    login,
    loadingAuth,
  };

  // Sử dụng AuthContext.Provider để cung cấp giá trị cho các component con
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
