import React, { createContext, useContext, useEffect, useState } from "react";

type TPlayingContext = {
  modalVisible: boolean;
  handleChangeModalVisible: (boolean) => void;
};

// Tạo AuthContext với giá trị mặc định là null
const PlayingContext = createContext<TPlayingContext | null>(null);

export function usePlaying() {
  return useContext(PlayingContext)!; // Bạn cần xác nhận rằng giá trị không phải null
}

type Props = {
  children: React.ReactNode;
};

export const PlayingContextProvider = ({ children }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleChangeModalVisible = (a: boolean) => {
    console.log("modalVisible", a);

    setModalVisible(a);
  };

  // Cập nhật giá trị của PlayingContextProvider
  const contextValue = {
    modalVisible,
    handleChangeModalVisible,
  };

  // Sử dụng PlayingContext.Provider để cung cấp giá trị cho các component con
  return <PlayingContext.Provider value={contextValue}>{children}</PlayingContext.Provider>;
};
