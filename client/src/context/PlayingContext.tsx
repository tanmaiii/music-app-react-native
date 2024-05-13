import React, { createContext, useContext, useEffect, useState } from "react";
import { TSong } from "../types";

type TPlayingContext = {
  openBarSong: boolean;
  setOpenBarSong: (value: boolean) => void;
  openModalSong: boolean;
  setOpenModalSong: (value: boolean) => void;
  songIdPlaying: string;
  changeSongPlaying: (value: string) => void;
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
  const [songIdPlaying, setSongIdPlaying] = useState<string | null>(null);
  const [openBarSong, setOpenBarSong] = useState<boolean>(true);
  const [openModalSong, setOpenModalSong] = useState<boolean>(false);

  const changeSongPlaying = (id: string) => {
    setSongIdPlaying(id);
  };

  // Cập nhật giá trị của PlayingContextProvider
  const contextValue: TPlayingContext = {
    openBarSong,
    setOpenBarSong,
    openModalSong,
    setOpenModalSong,
    songIdPlaying,
    changeSongPlaying,
  };

  // Sử dụng PlayingContext.Provider để cung cấp giá trị cho các component con
  return <PlayingContext.Provider value={contextValue}>{children}</PlayingContext.Provider>;
};
