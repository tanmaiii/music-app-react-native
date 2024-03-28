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

  const logout = async () => {
    setCurrentUser(null);
    await authApi.signout();
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await userApi.getMe();
        setCurrentUser(res);
      } catch (error) {
        setCurrentUser(null);
      }
    };
    currentUser && getInfo();
  }, []);

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        userString ? setCurrentUser(JSON.parse(userString)) : setCurrentUser(null);

        // console.log("AsyncStorage", currentUser);
        
      } catch (error) {
        console.error("Error getting user from AsyncStorage:", error);
        return null;
      }
    };
    getUserFromStorage();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Cập nhật giá trị của AuthContextProvider
  const contextValue: IAuthContext = {
    currentUser,
    setCurrentUser,
    logout,
  };

  // Sử dụng AuthContext.Provider để cung cấp giá trị cho các component con
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
