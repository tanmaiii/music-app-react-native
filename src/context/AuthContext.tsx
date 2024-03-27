import React, { createContext, useContext, useEffect, useState } from "react";
// import { authApi, useApi } from "../apis";
import { TUser } from "../types/index";

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
    // await authApi.signout();
  };

  useEffect(() => {
    const getInfo = async () => {
      try {
        // const res = await useApi.getMe();
        // setCurrentUser(res);
      } catch (error) {
        setCurrentUser(null);
      }
    };
    currentUser && getInfo();
  }, []);

  useEffect(() => {
    // localStorage.setItem("user", JSON.stringify(currentUser));
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
