import playApi from "@/apis/play/playApi";
import { apiConfig } from "@/configs";
import { TSong } from "@/types";
import { AVPlaybackStatus, Audio } from "expo-av";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useBarSong } from "./BarSongContext";
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
  currentSongIndex: number;
  random: boolean;
  loading: boolean;
  playSound: (songId: string) => Promise<void>;
  pauseSound: () => Promise<void>;
  stopSound: () => Promise<void>;
  playSong: (song: TSong) => void;
  changeSongDuration: (duration: number) => Promise<void>;
  changeSoundVolume: (volume: number) => Promise<void>;
  changeRandomQueue: () => void;
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
  const [random, setRandom] = useState<boolean>(false); // Trạng thái phát ngẫu nhiên
  const [queueRandom, setQueueRandom] = useState<number[]>([]); //Danh sách bài hát random đã được phát


  // Chuyển đổi millis sang phút:giây
  const formatDuration = (millis: number | null): string => {
    if (millis === null) return "0:00";
    const minutes = Math.floor(millis / 1000 / 60);
    const seconds = Math.floor((millis / 1000) % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const startSound = async (index: number) => {
    console.log("index", index, loading);
    if (index == null) return;
    // if (!queue[index]) return setToastMessage("Song not found");
    if (loading) return;
    try {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      }

      setOpenBarSong(true);
      setCurrentSongIndex(index);
      setSongIdPlaying(queue[index]?.id);
      setLoading(true);

      playApi.playSong(queue[index]?.id, token);
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

  const playSong = async (songNew: TSong) => {
    console.log("Play success");
    if (!queue.some((song) => song.id === songNew.id)) {
      setCurrentSongIndex(null);
      setQueue([songNew, ...queue]);
    } else {
      const index = queue.findIndex((song) => song.id === songNew.id);
      startSound(index);
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

  const changeRandomQueue = () => {
    setRandom(!random);
    setQueueRandom([currentSongIndex]);
  };

  const clearQueue = async () => {
    setQueue([]);
    setQueueRandom([]);
    setCurrentSongIndex(null);
    setSongIdPlaying(null);
    stopSound();
    setOpenBarSong(false);
    setOpenModalSong(false);
    await sound.stopAsync();
  };

  const changeToQueue = async (songs: TSong[]) => {
    setQueue([]);
    setCurrentSongIndex(null);

    if (songs.length <= 0) {
      setToastMessage("Queue is empty");
      return;
    }

    setCurrentSongIndex(null);
    setQueue(songs);
    setToastMessage("Change to queue success");
  };

  const updateToQueue = async (songs: TSong[]) => {
    setQueue(songs);
  };

  const addToQueue = (songNew: TSong) => {
    console.log("Add to queue");
    if (!queue.some((song) => song.id === songNew.id)) {
      setQueue([...queue, songNew]);
      setToastMessage("Add to queue success");
    } else {
      setToastMessage("Song already in queue");
    }
  };

  const removeToQueue = (songNew: TSong) => {
    setQueue(queue.filter((song) => song.id !== songNew.id));
  };

  const getRandomIndexSong = () => {
    // Nếu queueRandom đã chứa tất cả các chỉ số, đặt lại chỉ chứa chỉ số của bài hát hiện tại
    console.log(queueRandom, queue.length, currentSongIndex);

    if (queueRandom.length >= queue.length) {
      console.log("Reset queueRandom");
      setQueueRandom([]);

      return Math.floor(Math.random() * queue.length);
    }

    let randomIndex;

    // Tạo chỉ số ngẫu nhiên khác với currentSongIndex và không nằm trong queueRandom
    do {
      randomIndex = Math.floor(Math.random() * queue.length);
    } while (queueRandom.includes(randomIndex) || randomIndex === currentSongIndex);

    // Thêm chỉ số ngẫu nhiên hợp lệ vào queueRandom
    setQueueRandom([...queueRandom, randomIndex]);

    // Trả về chỉ số ngẫu nhiên
    return randomIndex;
  };

  // Phát bài hát tiếp theo từ queue
  const nextSong = async () => {
    if (loading) return;
    if (currentSongIndex !== null && currentSongIndex < queue.length - 1) {
      await sound.stopAsync();
      if (random) {
        const index = getRandomIndexSong();
        startSound(index);
        console.log("Next Song (Random): trên", index, queueRandom);
      } else {
        startSound(currentSongIndex + 1);
        console.log("Next Song", currentSongIndex + 1);
      }
    } else {
      await sound.stopAsync();
      if (random) {
        const index = getRandomIndexSong();
        startSound(index);
        console.log("Next Song (Random): ", index, queueRandom);
      } else {
        startSound(0);
        console.log("Next Song", 0);
      }
    }
  };

  // Phát bài hát trước đó từ queue
  const previousSong = async () => {
    if (loading) return;
    if (currentSongIndex > 0) {
      await sound.stopAsync();
      if (random) {
        startSound(getRandomIndexSong());
      } else {
        startSound(currentSongIndex - 1);
        console.log("Previous Song", currentSongIndex - 1);
      }
    } else {
      await sound.stopAsync();
      startSound(queue.length - 1);
      console.log("Previous Song", queue.length - 1);
    }
  };

  useEffect(() => {
    if (queue.length > 0 && currentSongIndex === null) {
      startSound(0);
    }
  }, [queue, currentSongIndex]);

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
    random,
    loading,
    playSound,
    stopSound,
    pauseSound,
    playSong,
    changeSongDuration,
    changeSoundVolume,
    changeRandomQueue,
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
