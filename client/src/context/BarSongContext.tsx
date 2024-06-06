import React, { createContext, useContext, useEffect, useState } from "react";
import { TSong } from "../types";

type TBarSongContext = {
  openBarSong: boolean;
  setOpenBarSong: (value: boolean) => void;
  openModalSong: boolean;
  setOpenModalSong: (value: boolean) => void;
  // songIdBarSong: string;
  // changeSongBarSong: (value: string) => void;
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
  // const [songIdBarSong, setSongIdBarSong] = useState<string | null>(null);
  const [openBarSong, setOpenBarSong] = useState<boolean>(true);
  const [openModalSong, setOpenModalSong] = useState<boolean>(false);

  // const changeSongBarSong = (id: string) => {
  //   setSongIdBarSong(id);
  // };

  // Cập nhật giá trị của BarSongContextProvider
  const contextValue: TBarSongContext = {
    openBarSong,
    setOpenBarSong,
    openModalSong,
    setOpenModalSong,
    // songIdBarSong,
    // changeSongBarSong,
  };

  // Sử dụng BarSongContext.Provider để cung cấp giá trị cho các component con
  return <BarSongContext.Provider value={contextValue}>{children}</BarSongContext.Provider>;
};
