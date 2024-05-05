import React, { createContext, useContext, useState } from "react";
import { Audio } from "expo-av";

export function useAudio() {
  return useContext(AudioContex)!;
}

type AudioContextType = {
  sound: Audio.Sound | null;
  isPlaying: boolean;
  playSound: () => Promise<void>;
  stopSound: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
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
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);

  const playSound = async () => {
    if (!sound) {
      const { sound } = await Audio.Sound.createAsync(require("../assets/mp3/song2.mp3"));
      setSound(sound);
    }
    await sound.playAsync();
    setIsPlaying(true);
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const setVolume = async (volume: number) => {
    if (sound) {
      await sound.setVolumeAsync(volume);
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

  const audioContextValue: AudioContextType = {
    sound,
    isPlaying,
    playSound,
    stopSound,
    setVolume,
    addToQueue,
    removeToQueue,
    nextSong,
    previousSong,
    queue,
  };

  return <AudioContex.Provider value={audioContextValue}>{children}</AudioContex.Provider>;
};
