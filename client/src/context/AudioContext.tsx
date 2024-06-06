import React, { createContext, useContext, useEffect, useState } from "react";
import { AVPlaybackStatus, Audio } from "expo-av";
import { useBarSong } from "./BarSongContext";
import playApi from "@/apis/play/playApi";
import { useAuth } from "./AuthContext";
import { apiConfig } from "@/configs";
import { useToast } from "./ToastContext";

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
  playSound: (songId: string) => Promise<void>;
  stopSound: () => Promise<void>;
  changeSongDuration: (duration: number) => Promise<void>;
  changeSoundVolume: (volume: number) => Promise<void>;
  addToQueue: (songUri: string) => void;
  removeToQueue: (songUri: string) => void;
  nextSong: () => void;
  previousSong: () => void;
  queue: string[];
};

type Props = {
  children: React.ReactNode;
};

const AudioContex = createContext<AudioContextType | null>(null);

export const AudioContextProvider = ({ children }: Props) => {
  const [songIdPlaying, setSongIdPlaying] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const { setOpenBarSong } = useBarSong();
  const { token } = useAuth();
  const { setToastMessage } = useToast();
  const [songDuration, setSongDuration] = useState<number | null>(null);
  const [currentPosition, setCurrentPosition] = useState<number | null>(null);
  const [volume, setVolume] = useState<number>(0.5);

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
    console.log(loading);

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

      const song_path = (await getPathSong(songId)) || "";

      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: apiConfig.mp3Url(song_path),
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

  const stopSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const getDuration = async () => {
      // Lấy độ dài của bài hát
      const status: AVPlaybackStatus = sound && (await sound.getStatusAsync());
      if (status?.isLoaded) {
        setSongDuration(status.durationMillis ?? null);
      }
    };
    getDuration();
  }, [sound]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (isPlaying) {
        const status: AVPlaybackStatus = sound && (await sound.getStatusAsync());
        if (status?.isLoaded) {
          // Cập nhật thời gian hiện tại của bài hát
          setCurrentPosition(status.positionMillis ?? null);
        }
      }
    }, 1000);

    if (!isPlaying) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, sound]);

  useEffect(() => {
    console.log(formatDuration(songDuration), formatDuration(currentPosition));

    if (formatDuration(songDuration) === formatDuration(currentPosition)) {
      stopSound();
      setIsPlaying(false);
    }
  }, [songDuration, currentPosition]);

  useEffect(() => {
    if (sound) {
      sound.setVolumeAsync(volume);
    }
  }, [volume]);

  const changeSongDuration = async (duration: number) => {
    if (loading || !sound) return;
    setLoading(true);

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

  const addToQueue = (songUri: string) => {
    setQueue([songUri, ...queue]);
  };

  const removeToQueue = (songUri: string) => {
    // setQueue([...queue, songUri]);
  };

  const nextSong = () => {
    if (currentSongIndex < queue.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
      // Phát bài hát tiếp theo từ queue
    }
  };

  const previousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
      // Phát bài hát trước đó từ queue
    }
  };

  useEffect(() => {
    console.log(queue);
  }, [queue]);

  const audioContextValue: AudioContextType = {
    sound,
    songIdPlaying,
    isPlaying,
    songDuration,
    currentPosition,
    volume,
    playSound,
    stopSound,
    changeSongDuration,
    changeSoundVolume,
    addToQueue,
    removeToQueue,
    nextSong,
    previousSong,
    queue,
  };

  return <AudioContex.Provider value={audioContextValue}>{children}</AudioContex.Provider>;
};
