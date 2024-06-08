import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Animated,
} from "react-native";
import styles from "./style";
import IMAGES from "../../constants/images";
const { width, height } = Dimensions.get("window");
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BORDERRADIUS, COLORS, SPACING } from "../../theme/theme";
import { useBarSong } from "../../context/BarSongContext";
import { faForwardStep, faPause, faPlay, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CustomBottomSheet from "../CustomBottomSheet";
import { TSong } from "../../types";
import { songApi } from "../../apis";
import { useAuth } from "../../context/AuthContext";
import ModalPlaying from "../ModalPlaying";
import apiConfig from "../../configs/axios/apiConfig";
import { useAudio } from "../../context/AudioContext";
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { PlayPauseButton, NextButton } from "@/components/PlayerControls";
import { Swipeable } from "react-native-gesture-handler";

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
    songIdPlaying,
    songDuration,
    currentPosition,
    clearQueue,
    nextSong
  } = useAudio();
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const progress = currentPosition ? (currentPosition / songDuration) * 100 : 0;

  const getSongs = async () => {
    setLoading(true);
    try {
      const res = await songApi.getDetail(songIdPlaying, token);
      setSong(res);
      console.log(res);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data.conflictError);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    songIdPlaying && getSongs();
  }, [songIdPlaying]);

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
