import { NextButton, PlayPauseButton } from "@/components/PlayerControls";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { songApi } from "@/apis";
import apiConfig from "@/configs/axios/apiConfig";
import IMAGES from "@/constants/images";
import { useAudio } from "@/context/AudioContext";
import { useAuth } from "@/context/AuthContext";
import { useBarSong } from "@/context/BarSongContext";
import { BORDERRADIUS, COLORS, SPACING } from "@/theme/theme";
import { TSong } from "@/types";
import CustomBottomSheet from "../CustomBottomSheet";
import ModalPlaying from "../ModalPlaying";
import styles from "./style";
const { width, height } = Dimensions.get("window");

interface PlayingCardProps {}

const PlayingCard = (props: PlayingCardProps) => {
  const { openBarSong, openModalSong, setOpenModalSong } = useBarSong();
  const { token } = useAuth();
  const [song, setSong] = React.useState<TSong | null>(null);
  const [loading, setLoading] = React.useState(false);
  const {
    playSound,
    stopSound,
    isPlaying,
    loading: loadingAudio,
    songIdPlaying,
    currentSongIndex,
    queue,
    songDuration,
    currentPosition,
    clearQueue,
    nextSong,
  } = useAudio();
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const progress = currentPosition ? (currentPosition / songDuration) * 100 : 0;

  const getSongs = async () => {
    setLoading(true);
    try {
      const res = await songApi.getDetail(songIdPlaying, token);
      setSong(res);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.conflictError);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (songIdPlaying) getSongs();
  }, [songIdPlaying, currentSongIndex, queue]);

  // React.useEffect(() => {
  //   setSong(queue[currentSongIndex]);
  // }, [queue, currentSongIndex, songIdPlaying]);

  React.useEffect(() => {
    openModalSong && setIsOpenModal(true);
  }, [openModalSong]);

  const handleClearSong = async () => {
    clearQueue();
  };

  const LeftSwipe = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          paddingHorizontal: SPACING.space_12,
        }}
      >
        <TouchableOpacity
          onPress={handleClearSong}
          style={{
            backgroundColor: COLORS.Red,
            padding: SPACING.space_12,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 60,
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} color={COLORS.White1} size={18} />
        </TouchableOpacity>
      </View>
    );
  };

  return openBarSong && song ? (
    <>
      <Pressable
        style={[styles.container, { width: width }]}
        onPress={() => setIsOpenModal(!isOpenModal)}
      >
        <Swipeable renderLeftActions={LeftSwipe}>
          <ImageBackground
            source={song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: BORDERRADIUS.radius_10,
            }}
            blurRadius={60}
          >
            <View style={styles.wrapper}>
              <View style={styles.left}>
                <View style={[styles.boxImage, styles.shadowProp]}>
                  <Image
                    style={styles.image}
                    source={
                      song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG
                    }
                  />
                </View>
                <View>
                  <Text style={styles.title}>{song?.title}</Text>
                  <Text style={styles.artist}>{song?.author}</Text>
                </View>
              </View>
              <View style={styles.right}>
                <View style={[styles.iconPlay]}>
                  <PlayPauseButton iconSize={24} />
                </View>
                <NextButton iconSize={26} />
              </View>
              <View style={styles.overlay} />
              <View style={styles.sliderBar}>
                <Animated.View style={[styles.slider, { width: `${progress}%` }, {}]} />
              </View>
            </View>
          </ImageBackground>
        </Swipeable>
      </Pressable>
      {isOpenModal && (
        <CustomBottomSheet
          isOpen={true}
          closeModal={() => {
            setIsOpenModal(false);
            setOpenModalSong(false);
          }}
          height1="100%"
        >
          <ModalPlaying />
        </CustomBottomSheet>
      )}
    </>
  ) : (
    <></>
  );
};

export default PlayingCard;
