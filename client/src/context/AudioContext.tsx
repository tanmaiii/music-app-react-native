import React, { createContext, useContext, useEffect, useState } from "react";
import { AVPlaybackStatus, Audio } from "expo-av";
import { useBarSong } from "./BarSongContext";
import playApi from "@/apis/play/playApi";
import { useAuth } from "./AuthContext";
import { apiConfig } from "@/configs";
import { useToast } from "./ToastContext";
import { TSong } from "@/types";
import { isLoading } from "expo-font";
import { faL } from "@fortawesome/free-solid-svg-icons";

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
  clearQueue: () => void;
  changeToQueue: (songs: TSong[]) => void;
  updateToQueue: (songs: TSong[]) => void;
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
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null); // Vị trí của bài hát trong queue
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // Trạng thái phát nhạc
  const [songDuration, setSongDuration] = useState<number | null>(null); // Độ dài của bài hát
  const [currentPosition, setCurrentPosition] = useState<number | null>(null); // Thời gian hiện tại của bài hát
  const [volume, setVolume] = useState<number>(0.5); // Âm lượng của bài hát
  const [queue, setQueue] = useState<TSong[] | null>([]); // Danh sách chờ

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

  const playSound = async (songId?: string) => {
    if (loading) return;
    try {
      setLoading(true);
      if (sound) {
        await sound.pauseAsync();
      }
      await sound.playAsync();
      setIsPlaying(true);
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };

  const startSound = async (index: number) => {
    console.log("index", index, loading);
    if (!queue[index]) return setToastMessage("Song not found");
    if (loading) return;
    try {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      }

      setLoading(true);

      console.log("START SONG", queue[index]?.title);

      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: apiConfig.mp3Url(queue[index]?.song_path),
      });

      setSound(newSound);
      await newSound.playAsync();

      setOpenBarSong(true);
      // setOpenModalSong(true);
      setIsPlaying(true);

      setLoading(false);
    } catch (error) {
      setToastMessage("Start queue song fall, try again!");
    }
    setLoading(false);
  };

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

  const clearQueue = async () => {
    setQueue([]);
    setCurrentSongIndex(null);
    setSongIdPlaying(null);
    stopSound();
    setOpenBarSong(false);
    setOpenModalSong(false);
    await sound.stopAsync();
  };

  const changeToQueue = async (songs: TSong[]) => {
    setQueue(songs);
    setCurrentSongIndex(0);
  };

  const updateToQueue = async (songs: TSong[]) => {
    setQueue(songs);
  };

  const addToQueue = (songNew: TSong) => {
    console.log("Add to queue");
    setQueue([songNew, ...queue]);
  };

  const removeToQueue = (songNew: TSong) => {
    setQueue(queue.filter((song) => song.id !== songNew.id));
  };

  // Phát bài hát tiếp theo từ queue
  const nextSong = async () => {
    if (currentSongIndex < queue.length - 1) {
      await sound.stopAsync();
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
    console.log("Next Song", currentSongIndex + 1);
  };

  const previousSong = async () => {
    if (queue.length > 1) {
      await sound.stopAsync();
      if (currentSongIndex - 1 < 0) {
        setCurrentSongIndex(queue.length - 1);
      } else {
        setCurrentSongIndex(currentSongIndex - 1);
      }
    }
    console.log("prev Song");
  };

  // Phát bài hát trong queue khi thay đổi vị trí bài hát
  useEffect(() => {
    const started = async () => {
      await startSound(currentSongIndex);
      setSongIdPlaying(queue[currentSongIndex]?.id);
      console.log("ID SONG PLAYING", queue[currentSongIndex]?.title);
    };
    queue.length > 0 && started();
  }, [currentSongIndex]);

  useEffect(() => {}, [queue]);

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

  // Khi hết thời gian bai hát
  useEffect(() => {
    if (
      currentPosition !== null &&
      songDuration !== null &&
      formatDuration(songDuration) === formatDuration(currentPosition)
    ) {
      stopSound();
      setIsPlaying(false);
      //Phát bài mới khi kết thúc
      nextSong();
    }
  }, [currentPosition, songDuration]);

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
    clearQueue,
    changeToQueue,
    updateToQueue,
    addToQueue,
    removeToQueue,
    nextSong,
    previousSong,
    queue,
  };

  return <AudioContex.Provider value={audioContextValue}>{children}</AudioContex.Provider>;
};
