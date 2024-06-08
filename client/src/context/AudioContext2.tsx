import React, { createContext, useContext, useEffect, useState } from "react";
import { AVPlaybackStatus, Audio } from "expo-av";
import { useBarSong } from "./BarSongContext";
import playApi from "@/apis/play/playApi";
import { useAuth } from "./AuthContext";
import { apiConfig } from "@/configs";
import { useToast } from "./ToastContext";
import { TSong } from "@/types";

export function useAudio() {
  return useContext(AudioContex)!;
}

type AudioContextType = {
  sound: Audio.Sound | null;
  songIdPlaying: string | null;
  isPlaying: boolean;
  songDuration: number;
  currentPosition: number;
  volume: number;
  currentSongIndex: number;
  playSound: (songId: string) => Promise<void>;
  pauseSound: () => Promise<void>;
  stopSound: () => Promise<void>;
  changeSongDuration: (duration: number) => Promise<void>;
  changeSoundVolume: (volume: number) => Promise<void>;
  changeToQueue: (songs: TSong[]) => void;
  addToQueue: (song: TSong) => void;
  removeToQueue: (song: TSong) => void;
  nextSong: () => void;
  previousSong: () => void;
  queue: TSong[];
};

type Props = {
  children: React.ReactNode;
};

const AudioContex = createContext<AudioContextType | null>(null);

export const AudioContextProvider = ({ children }: Props) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { setOpenBarSong, setOpenModalSong } = useBarSong();
  const { setToastMessage } = useToast();
  const { token } = useAuth();

  const [songIdPlaying, setSongIdPlaying] = useState<string | null>(null); // ID của bài hát đang được phát
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(null); // Vị trí của bài hát trong queue
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Trạng thái phát nhạc
  const [songDuration, setSongDuration] = useState<number | null>(null); // Độ dài của bài hát
  const [currentPosition, setCurrentPosition] = useState<number | null>(null); // Thời gian hiện tại của bài hát
  const [volume, setVolume] = useState<number>(0.5); // Âm lượng của bài hát
  const [queue, setQueue] = useState<TSong[]>([]); // Danh sách chờ

  const getPathSong = async (songId: string) => {
    setSongIdPlaying(songId);
    try {
      const res = playApi.playSong(songId, token);
      console.log((await res).title, (await res).song_path);

      return res && (await res).song_path;
    } catch (error) {}
  };

  // Chuyển đổi millis sang phút:giây
  const formatDuration = (millis: number | null): string => {
    if (millis === null) return "0:00";
    const minutes = Math.floor(millis / 1000 / 60);
    const seconds = Math.floor((millis / 1000) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const playSound = async (songId: string) => {
    if (loading) return;

    if (songIdPlaying === songId) {
      if (isPlaying) {
        await sound?.setPositionAsync(0);
      } else {
        if (formatDuration(songDuration) == formatDuration(currentPosition)) {
          await sound?.setPositionAsync(0);
        }
        await sound?.playAsync();
        setIsPlaying(true);
      }
      return;
    }

    setLoading(true);

    try {
      // Dừng các bài hát đang được phát
      if (sound) {
        await sound.stopAsync();
        setSound(null);
      }

      const song_path = getPathSong(songId);

      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: apiConfig.mp3Url(queue[currentSongIndex]?.song_path),
      });

      setSound(newSound);
      await newSound.playAsync();
      setOpenBarSong(true);
      setLoading(false);
      setIsPlaying(true);
    } catch (error) {
      setToastMessage("Unable to play the song, try again!");
    }
    setLoading(false);
  };

  // const playSound = async (songId: string) => {
  //   if (loading) return;
  //   setLoading(true);

  //   if(songId !== songIdPlaying){
  //     setCurrentSongIndex(queue.findIndex((song) => song.id === songId));
  //   }

  //   try {
  //     // Dừng các bài hát đang được phát
  //     if (sound) {
  //       await sound.stopAsync();
  //       setSound(null);
  //     }

  //     const { sound: newSound } = await Audio.Sound.createAsync({
  //       uri: apiConfig.mp3Url(queue[currentSongIndex]?.song_path),
  //     });

  //     setSound(newSound);
  //     await newSound.playAsync();
  //     setOpenBarSong(true);
  //     setLoading(false);
  //     setIsPlaying(true);
  //   } catch (error) {
  //     setToastMessage("Unable to play the song, try again!");
  //   }
  //   setLoading(false);
  // };

  const stopSound = async () => {
    if (sound) {
      setIsPlaying(false);
      await sound.pauseAsync();
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  const changeSongDuration = async (duration: number) => {
    if (loading || !sound) return;
    setLoading(true);
    await sound.pauseAsync();

    await sound.setPositionAsync(duration);

    await sound.playAsync();

    setIsPlaying(true);
    setLoading(false);
  };

  const changeSoundVolume = async (newVolume: number) => {
    if (sound) {
      await sound.setVolumeAsync(newVolume);
      setVolume(newVolume);
    }
  };

  const changeToQueue = (songs: TSong[]) => {
    setQueue(songs);
    setOpenBarSong(true);
    setCurrentSongIndex(0);
    setOpenModalSong(true);
  };

  const addToQueue = (songNew: TSong) => {
    setQueue([songNew, ...queue]);
  };

  const removeToQueue = (songNew: TSong) => {
    // setQueue([...queue, songUri]);
  };

  const nextSong = () => {
    if (currentSongIndex < queue.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      // Phát bài hát tiếp theo từ queue
      playSound(queue[currentSongIndex + 1]?.id);
    }

    console.log("Next Song", currentSongIndex + 1);
  };

  const previousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      // Phát bài hát trước đó từ queue
      playSound(queue[currentSongIndex - 1]?.id);
    }
    console.log("prev Song");
  };

  useEffect(() => {
    if (currentSongIndex >= 0 && currentSongIndex < queue.length) {
      setSongIdPlaying(queue[currentSongIndex]?.id);
    }
    playSound(queue[currentSongIndex]?.id);
  }, [currentSongIndex, queue]);

  useEffect(() => {
    console.log("Danh sach queue thay doi");
  }, [queue]);

  useEffect(() => {
    if (songIdPlaying == "" || undefined || null) {
      setOpenBarSong(false);
    } else {
      setOpenBarSong(true);
    }
  }, [queue, songIdPlaying]);

  // Lấy độ dài của bài hát
  useEffect(() => {
    const getDuration = async () => {
      const status: AVPlaybackStatus = sound && (await sound.getStatusAsync());
      if (status?.isLoaded) {
        setSongDuration(status.durationMillis ?? null);
      }
    };
    getDuration();
  }, [queue, sound, songIdPlaying, currentSongIndex]);

  // Cập nhật thời gian hiện tại của bài hát
  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (isPlaying) {
        const status: AVPlaybackStatus = sound && (await sound.getStatusAsync());
        if (status?.isLoaded) {
          setCurrentPosition(status.positionMillis ?? null);
        }
      }
    }, 1000);

    if (!isPlaying) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [queue, isPlaying, sound, songIdPlaying]);

  // Khi hết thời gian bafi hát
  useEffect(() => {
    if (formatDuration(songDuration) === formatDuration(currentPosition)) {
      stopSound();
      setIsPlaying(false);
    }
  }, [queue, currentPosition, songDuration, songIdPlaying]);

  useEffect(() => {
    setSongIdPlaying(queue[currentSongIndex]?.id);
    console.log("doi id bai dang phat");
  }, [currentSongIndex]);

  // Cập nhật âm lượng của bài hát
  useEffect(() => {
    if (sound) {
      sound.setVolumeAsync(volume);
    }
  }, [volume]);

  const audioContextValue: AudioContextType = {
    sound,
    songIdPlaying,
    isPlaying,
    songDuration,
    currentPosition,
    volume,
    currentSongIndex,
    playSound,
    stopSound,
    pauseSound,
    changeSongDuration,
    changeSoundVolume,
    changeToQueue,
    addToQueue,
    removeToQueue,
    nextSong,
    previousSong,
    queue,
  };

  return <AudioContex.Provider value={audioContextValue}>{children}</AudioContex.Provider>;
};
