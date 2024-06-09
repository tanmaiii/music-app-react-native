import React, { createContext, useContext, useState } from "react";

type TBarSongContext = {
  openBarSong: boolean;
  setOpenBarSong: (value: boolean) => void;
  openModalSong: boolean;
  setOpenModalSong: (value: boolean) => void;
};

// Tạo AuthContext với giá trị mặc định là null
const BarSongContext = createContext<TBarSongContext | null>(null);

export function useBarSong() {
  return useContext(BarSongContext)!; // Bạn cần xác nhận rằng giá trị không phải null
}

type Props = {
  children: React.ReactNode;
};

export const BarSongContextProvider = ({ children }: Props) => {
  const [openBarSong, setOpenBarSong] = useState<boolean>(true);
  const [openModalSong, setOpenModalSong] = useState<boolean>(false);

  // Cập nhật giá trị của BarSongContextProvider
  const contextValue: TBarSongContext = {
    openBarSong,
    setOpenBarSong,
    openModalSong,
    setOpenModalSong,
  };

  return <BarSongContext.Provider value={contextValue}>{children}</BarSongContext.Provider>;
};
