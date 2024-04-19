import * as React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Modal,
  Animated,
} from "react-native";
import IMAGES from "../../constants/images";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";
import TouchableScale from "../../components/TouchableScale";
import { songApi } from "../../apis";
import { TSong } from "../../types";
import { useAuth } from "../../context/AuthContext";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import apiConfig from "../../apis/apiConfig";
import TrackPlayer, { State } from "react-native-track-player";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowUpFromBracket,
  faBars,
  faForwardStep,
  faHeart,
  faPause,
  faPlay,
  faShuffle,
  faStepBackward,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { LinearGradient } from "expo-linear-gradient";
import { usePlaying } from "../../context/PlayingContext";
import CustomModal from "../CustomModal";
import { ModalSong } from "../ItemModal";
import CustomBottomSheet from "../CustomBottomSheet";
import { BlurView } from "expo-blur";
import { ScrollView } from "react-native-gesture-handler";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

interface TSongPlaying {}

const ModalPlaying = (props: TSongPlaying) => {
  const { songPlaying } = usePlaying();
  const { token } = useAuth();
  const [play, setPlay] = useState(false);
  const [like, setLike] = useState(false);
  const [song, setSong] = useState<TSong | null>(null);
  const [sound, setSound] = useState(null);
  const [durationMillis, setDurationMillis] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const loadSound = async () => {
    const { sound, status: any } = await Audio.Sound.createAsync(
      require("../../assets/mp3/song1.mp3")
    );
    setSound(sound);
  };

  const getSong = async () => {
    try {
      const res = await songApi.getDetail(songPlaying, token);
      console.log(res);
      setSong(res);
    } catch (err) {
      console.log(err.response.data.conflictError);
    }
  };

  React.useEffect(() => {
    console.log(songPlaying);

    songPlaying && getSong();
  }, [songPlaying]);

  const handleClickPlay = () => {
    setPlay((play) => !play);
    play ? sound.playAsync() : sound.pauseAsync();
  };

  return (
    <>
      <ImageBackground
        source={song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG}
        style={styles.container}
        blurRadius={80}
      >
        <LinearGradient
          colors={["transparent", COLORS.Black2]}
          style={[{ position: "absolute", left: 0, right: 0, top: 0, height: WINDOW_HEIGHT }]}
        ></LinearGradient>

        <StatusBar barStyle="light-content" />

        <View style={styles.wrapper}>
          <View
            style={{
              width: 48,
              height: 6,
              backgroundColor: COLORS.WhiteRGBA50,
              borderRadius: BORDERRADIUS.radius_14,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: SPACING.space_36,
            }}
          ></View>

          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View style={styles.wrapperImage}>
              <Image
                style={[styles.image, { zIndex: 99 }]}
                source={
                  song?.image_path ? { uri: apiConfig.imageURL(song.image_path) } : IMAGES.SONG
                }
              />
            </View>
          </View>

          <View style={styles.playerControlsTop}>
            <Text numberOfLines={1} style={styles.textMain}>
              {song?.title}
            </Text>
            <Text numberOfLines={1} style={styles.textExtra}>
              {song?.author}
            </Text>
          </View>

          <View style={styles.playerControlsBar}>
            <View style={styles.scrollBar}>
              <View style={styles.slider}>
                <View
                  style={{
                    width: "100%",
                    marginTop: 10,
                    height: 6,
                    backgroundColor: COLORS.WhiteRGBA50,
                    borderRadius: 5,
                  }}
                >
                  <View
                    style={[
                      {
                        width: `${0.1 * 100}%`,
                        height: "100%",
                        backgroundColor: COLORS.Primary,
                        borderRadius: 5,
                      },
                    ]}
                  />
                  <View
                    style={[
                      {
                        position: "absolute",
                        top: -5,
                        width: 16,
                        height: 16,
                        borderRadius: 16 / 2,
                        backgroundColor: COLORS.Primary,
                      },
                      {
                        left: `${0.1 * 100}%`,
                        marginLeft: -16 / 2,
                      },
                    ]}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.textExtra}>0:38 </Text>
                <Text style={styles.textExtra}>{durationMillis}</Text>
              </View>
            </View>

            <View style={styles.action}>
              <TouchableOpacity style={styles.actionButton}>
                <FontAwesomeIcon icon={faStepBackward} size={28} color={COLORS.Primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButtonStart} onPress={handleClickPlay}>
                {!play ? (
                  <FontAwesomeIcon icon={faPause} size={28} color={COLORS.White1} />
                ) : (
                  <FontAwesomeIcon icon={faPlay} size={28} color={COLORS.White1} />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <FontAwesomeIcon icon={faForwardStep} size={28} color={COLORS.Primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.playerControlsBottom}>
            <TouchableOpacity style={styles.BottomButton} onPress={() => setLike((like) => !like)}>
              {like ? (
                <FontAwesomeIcon icon={faHeart} size={20} color={COLORS.Red} />
              ) : (
                <FontAwesomeIcon icon={faHeartRegular} size={20} color={COLORS.WhiteRGBA50} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.BottomButton}>
              <FontAwesomeIcon icon={faShuffle} size={20} color={COLORS.WhiteRGBA50} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.BottomButton}>
              <FontAwesomeIcon icon={faArrowUpFromBracket} size={20} color={COLORS.WhiteRGBA50} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.BottomButton}
              onPress={() => setIsOpenModal(!isOpenModal)}
            >
              <FontAwesomeIcon icon={faBars} size={20} color={COLORS.WhiteRGBA50} />
            </TouchableOpacity>
          </View>
        </View>
        {isOpenModal && (
          <Modal visible={isOpenModal} transparent>
            <MoreSong song={song} setIsOpenModal={setIsOpenModal} />
          </Modal>
        )}
      </ImageBackground>
    </>
  );
};

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const MoreSong = ({
  setIsOpenModal,
  song,
}: {
  setIsOpenModal: (isOpen: boolean) => void;
  song: TSong;
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, height: WINDOW_HEIGHT }}>
      <AnimatedBlurView
        tint="dark"
        intensity={100}
        style={{ flex: 1, paddingVertical: SPACING.space_12 }}
        blurReductionFactor={100}
      >
        <Animated.View
          style={[
            {
              flex: 1,
              height: WINDOW_HEIGHT,
              justifyContent: "space-between",
              flexDirection: "column",
            },
          ]}
        >
          <ScrollView style={{ flex: 1 }}>
            <ModalSong song={song} size={2} />
          </ScrollView>
        </Animated.View>
        <TouchableOpacity
          onPress={() => setIsOpenModal(false)}
          style={{ alignItems: "center", padding: SPACING.space_12 }}
        >
          <Text style={styles.textExtra}>Close</Text>
        </TouchableOpacity>
      </AnimatedBlurView>
    </View>
  );
};

export default ModalPlaying;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: WINDOW_HEIGHT,
  },
  textMain: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.medium,
    textAlign: "center",
    color: COLORS.White1,
  },
  textExtra: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.regular,
    color: COLORS.White2,
  },
  wrapper: {
    paddingTop: SPACING.space_18,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%",
  },
  wrapperImage: {
    // aspectRatio: 1, // Đảm bảo chiều cao và chiều rộng bằng nhau
    width: 340,
    height: 340,
    // borderRadius: imageSize / 2,
    borderRadius: BORDERRADIUS.radius_8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    // transform: [{rotate: '100deg'}]
  },
  playerControlsTop: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingVertical: SPACING.space_28,
  },
  buttonMore: {
    backgroundColor: COLORS.WhiteRGBA15,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 25,
  },

  playerControlsBar: {
    paddingHorizontal: SPACING.space_18,
    width: "100%",
    gap: SPACING.space_8,
  },
  scrollBar: {
    width: "100%",
    gap: SPACING.space_8,
  },
  slider: {
    width: "100%",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_32,
  },
  actionButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  actionButtonStart: {
    backgroundColor: COLORS.Primary,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  playerControlsBottom: {
    marginTop: SPACING.space_32,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.space_18,
    alignItems: "center",
    width: "100%",
    borderTopColor: COLORS.WhiteRGBA15,
    borderTopWidth: 1,
  },
  BottomButton: {
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
});
